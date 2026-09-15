import { describe, expect, it } from "vitest";
import { parseSessionFile } from "./transcripts.js";

const ZONE = "America/Montevideo";

function line(record: Record<string, unknown>): string {
  return JSON.stringify(record);
}

function messageRecord(overrides: Record<string, unknown> = {}): string {
  return line({
    type: "assistant",
    timestamp: "2026-08-24T14:00:00.000Z", // 11:00 in America/Montevideo (-03)
    cwd: "/Users/belen.carozo/projects/myr",
    gitBranch: "fix/FFT-1390-something-went-wrong",
    isSidechain: false,
    isMeta: false,
    ...overrides,
  });
}

const opts = { sinceIso: "2026-08-24", untilIso: "2026-08-24", zone: ZONE };

describe("parseSessionFile", () => {
  it("resolves a signal from the ai-title record joined with message records by sessionId-less two-pass parsing", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "Debug Android share extension image loading" }),
      messageRecord(),
    ];
    const signals = parseSessionFile(lines, opts);
    expect(signals).toHaveLength(1);
    expect(signals[0]).toMatchObject({
      repo: "myr",
      branch: "fix/FFT-1390-something-went-wrong",
      ticket: "FFT-1390",
      text: "Debug Android share extension image loading",
      source: "session",
    });
  });

  it("returns no signals when there is no ai-title record at all", () => {
    const lines = [messageRecord()];
    expect(parseSessionFile(lines, opts)).toHaveLength(0);
  });

  it("returns no signals for a low-information auto-title", () => {
    for (const title of ["Yes please", "Try again now", "Model haiku", "ok"]) {
      const lines = [line({ type: "ai-title", sessionId: "s1", aiTitle: title }), messageRecord()];
      expect(parseSessionFile(lines, opts), title).toHaveLength(0);
    }
  });

  it("a later ai-title record for the same session overwrites an earlier one", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "Yes please" }),
      line({ type: "ai-title", sessionId: "s1", aiTitle: "Debug Android share extension image loading" }),
      messageRecord(),
    ];
    const signals = parseSessionFile(lines, opts);
    expect(signals[0].text).toBe("Debug Android share extension image loading");
  });

  it("drops sidechain, meta, and malformed records", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "Debug Android share extension image loading" }),
      messageRecord({ isSidechain: true, timestamp: "2026-08-24T13:00:00.000Z" }),
      messageRecord({ isMeta: true, timestamp: "2026-08-24T13:30:00.000Z" }),
      "{not valid json",
      messageRecord(),
    ];
    const signals = parseSessionFile(lines, opts);
    expect(signals).toHaveLength(1);
    // only the one non-sidechain/non-meta record at 11:00 survives - a run of one.
    expect(signals[0].start.toFormat("HH:mm")).toBe("11:00");
    expect(signals[0].end.toFormat("HH:mm")).toBe("11:00");
  });

  it("drops records outside the requested date window", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "Debug Android share extension image loading" }),
      messageRecord({ timestamp: "2026-08-20T14:00:00.000Z" }), // a different day
    ];
    expect(parseSessionFile(lines, opts)).toHaveLength(0);
  });

  it("collapses a contiguous run on the same branch into one signal spanning first-to-last timestamp", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "General debugging session notes" }), // no ticket - avoids the title/branch ticket-conflict check

      messageRecord({ timestamp: "2026-08-24T13:00:00.000Z" }), // 10:00 local
      messageRecord({ timestamp: "2026-08-24T14:00:00.000Z" }), // 11:00 local
      messageRecord({ timestamp: "2026-08-24T14:30:00.000Z" }), // 11:30 local
    ];
    const signals = parseSessionFile(lines, opts);
    expect(signals).toHaveLength(1);
    expect(signals[0].start.toFormat("HH:mm")).toBe("10:00");
    expect(signals[0].end.toFormat("HH:mm")).toBe("11:30");
  });

  it("splits into separate signals when the branch changes mid-session", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "Systematic debugging for FFT-1355" }),
      messageRecord({ timestamp: "2026-08-24T13:00:00.000Z", gitBranch: "fix/FFT-1355-a" }),
      messageRecord({ timestamp: "2026-08-24T14:00:00.000Z", gitBranch: "fix/FFT-1355-a" }),
      messageRecord({ timestamp: "2026-08-24T15:00:00.000Z", gitBranch: "main" }),
    ];
    const signals = parseSessionFile(lines, opts);
    expect(signals).toHaveLength(2);
    expect(signals[0].branch).toBe("fix/FFT-1355-a");
    expect(signals[1].branch).toBe("main");
  });

  it("splits into separate signals when cwd changes even though the branch name stays the same", () => {
    // Regression: two repos on the same branch name ("main") must never merge into one run
    // tagged with only the first repo's basename.
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "General debugging session notes" }),
      messageRecord({ timestamp: "2026-08-24T13:00:00.000Z", cwd: "/Users/belen.carozo/projects/myr", gitBranch: "main" }),
      messageRecord({ timestamp: "2026-08-24T14:00:00.000Z", cwd: "/Users/belen.carozo/projects/toggl-mcp", gitBranch: "main" }),
    ];
    const signals = parseSessionFile(lines, opts);
    expect(signals).toHaveLength(2);
    expect(signals[0].repo).toBe("myr");
    expect(signals[1].repo).toBe("toggl-mcp");
  });

  it("filters out signals whose repo basename is not in repoBasenames", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "Build Toggle MCP for automatic time tracking" }),
      messageRecord({ cwd: "/Users/belen.carozo/projects/toggl-mcp" }),
    ];
    expect(parseSessionFile(lines, { ...opts, repoBasenames: ["myr"] })).toHaveLength(0);
    expect(parseSessionFile(lines, { ...opts, repoBasenames: ["toggl-mcp"] })).toHaveLength(1);
    expect(parseSessionFile(lines, opts)).toHaveLength(1); // no filter = keep everything
  });

  it("drops a branch-run whose ticket disagrees with the ticket named in the session's title", () => {
    // Regression: a session that touches several branches still has one, session-wide
    // title. If that title names a different ticket than this particular branch-run, the
    // title is almost certainly describing another run in the same session - emitting a
    // signal here would confidently attach the wrong topic to this branch's work.
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "FFT-1390 Something went wrong error" }),
      messageRecord({ gitBranch: "fix/FFT-1396-cut-word-on-popover" }),
    ];
    expect(parseSessionFile(lines, opts)).toHaveLength(0);
  });

  it("keeps a branch-run when the title names the same ticket as the branch", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "FFT-1390 Something went wrong error" }),
      messageRecord({ gitBranch: "fix/FFT-1390-something-went-wrong" }),
    ];
    expect(parseSessionFile(lines, opts)).toHaveLength(1);
  });

  it("keeps a branch-run with no ticket of its own even when the title names one", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "FFT-1390 Something went wrong error" }),
      messageRecord({ gitBranch: "release/1.1" }),
    ];
    const signals = parseSessionFile(lines, opts);
    expect(signals).toHaveLength(1);
    expect(signals[0].ticket).toBeNull();
  });

  it("a record with an empty gitBranch resolves to a null branch and null ticket", () => {
    const lines = [
      line({ type: "ai-title", sessionId: "s1", aiTitle: "Explore Claude Haiku model options" }),
      messageRecord({ gitBranch: "" }),
    ];
    const signals = parseSessionFile(lines, opts);
    expect(signals[0].branch).toBeNull();
    expect(signals[0].ticket).toBeNull();
  });
});
