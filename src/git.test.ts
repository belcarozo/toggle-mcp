import { describe, expect, it } from "vitest";
import { looksLikeBranch, parseReflog } from "./git.js";

describe("looksLikeBranch", () => {
  it("rejects the default base branches", () => {
    expect(looksLikeBranch("main")).toBe(false);
    expect(looksLikeBranch("master")).toBe(false);
    expect(looksLikeBranch("develop")).toBe(false);
  });

  it("accepts anything else by default", () => {
    expect(looksLikeBranch("fix/FFT-1326-android-image")).toBe(true);
    expect(looksLikeBranch("trunk")).toBe(true);
  });

  it("respects a custom base-branch list", () => {
    expect(looksLikeBranch("main", ["trunk"])).toBe(true);
    expect(looksLikeBranch("trunk", ["trunk"])).toBe(false);
  });

  it("still rejects SHAs and detached-HEAD refs regardless of baseBranches", () => {
    expect(looksLikeBranch("a1b2c3d", ["trunk"])).toBe(false);
    expect(looksLikeBranch("(no branch, rebasing main)", ["trunk"])).toBe(false);
  });
});

describe("parseReflog", () => {
  const opts = { sinceIso: "2026-08-24", untilIso: "2026-08-24", zone: "America/Montevideo", repoName: "myr" };

  it("attributes a commit to the branch of the most recent in-window checkout", () => {
    // git reflog lists newest first - the commit (11:00) comes before the checkout (10:00) that set its branch.
    const raw = [
      "abc1234 HEAD@{2026-08-24 11:00:00 -0300}: commit: FFT-1326: does the thing",
      "abc1234 HEAD@{2026-08-24 10:00:00 -0300}: checkout: moving from main to fix/FFT-1326-x",
    ].join("\n");
    const events = parseReflog(raw, opts);
    expect(events).toHaveLength(1);
    expect(events[0].branch).toBe("fix/FFT-1326-x");
    expect(events[0].description).toBe("FFT-1326: does the thing");
  });

  it("drops a commit with no preceding checkout in-window (no known branch to attribute it to)", () => {
    const raw = "abc1234 HEAD@{2026-08-24 11:00:00 -0300}: commit: does the thing";
    expect(parseReflog(raw, opts)).toHaveLength(0);
  });

  it("with the default base branches, does not attribute work to a checkout onto trunk", () => {
    const raw = [
      "abc1234 HEAD@{2026-08-24 11:00:00 -0300}: commit: merge stuff",
      "abc1234 HEAD@{2026-08-24 10:00:00 -0300}: checkout: moving from fix/FFT-1326-x to main",
    ].join("\n");
    expect(parseReflog(raw, opts)).toHaveLength(0);
  });

  it("with a custom baseBranches list, treats trunk as a base branch instead of main", () => {
    const raw = [
      "abc1234 HEAD@{2026-08-24 11:00:00 -0300}: commit: on trunk",
      "abc1234 HEAD@{2026-08-24 10:00:00 -0300}: checkout: moving from main to trunk",
    ].join("\n");
    expect(parseReflog(raw, { ...opts, baseBranches: ["trunk"] })).toHaveLength(0);

    const rawOntoMain = [
      "abc1234 HEAD@{2026-08-24 11:00:00 -0300}: commit: on main",
      "abc1234 HEAD@{2026-08-24 10:00:00 -0300}: checkout: moving from trunk to main",
    ].join("\n");
    const events = parseReflog(rawOntoMain, { ...opts, baseBranches: ["trunk"] });
    expect(events).toHaveLength(1);
    expect(events[0].branch).toBe("main");
  });
});
