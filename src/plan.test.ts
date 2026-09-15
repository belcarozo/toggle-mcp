import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { planDay } from "./plan.js";
import { buildWeekPlan } from "./week.js";
import type { CalendarEventInput, Config, ExistingTimeEntry, GitEvent } from "./types.js";

// Uruguay abolished DST in 2015, so America/Montevideo has no DST transitions
// to test against. The real boundary risk here is calendar events arriving
// in a different offset than the configured zone, which the "calendar event
// in UTC" case below exercises instead.
const ZONE = "America/Montevideo";

const baseConfig: Config = {
  timezone: ZONE,
  projectName: "Mobile Development People Inc",
  workday: { start: "10:00", end: "18:00", lunchMinutes: 30, lunchAt: "13:00", days: ["mon", "tue", "wed", "thu", "fri"] },
  classes: [
    { label: "Solfeggio class", day: "mon", start: "14:00", end: "15:30" },
    { label: "Solfeggio class", day: "thu", start: "14:00", end: "15:30" },
    { label: "Dance class", day: "wed", start: "17:00", end: "19:00" },
    { label: "Italian class", day: "fri", start: "15:00", end: "16:30" },
    { label: "Expression class", day: "fri", start: "18:00", end: "21:00" },
  ],
  nonWorkTitlePatterns: ["\\bclass\\b"],
  repos: ["/fake/repo"],
  ticketPattern: "([A-Za-z]{2,4}-\\d+)",
  baseBranches: ["main", "master", "develop"],
  minEntryMinutes: 15,
  roundToMinutes: 15,
  tags: [],
  createdWith: "toggl-mcp",
};

function gitEvent(date: string, time: string, branch: string, ticket: string, overrides: Partial<GitEvent> = {}) {
  return {
    timestamp: DateTime.fromFormat(`${date} ${time}`, "yyyy-MM-dd HH:mm", { zone: ZONE }),
    repo: "myr",
    branch,
    ticket,
    description: null,
    kind: "checkout" as const,
    ...overrides,
  };
}

describe("planDay - the week-schedule table from the plan", () => {
  const commonArgs = {
    config: baseConfig,
    gitEvents: [gitEvent("2026-08-24", "09:00", "fix/FFT-9999-something", "FFT-9999", { kind: "commit", description: "FFT-9999: did the thing" })],
    calendarEvents: [] as CalendarEventInput[],
    existingEntries: [] as ExistingTimeEntry[],
    priorTicket: null,
  };

  it("Tuesday: no classes -> 7.5h", () => {
    const { plan } = planDay({ ...commonArgs, date: "2026-08-25" }); // Tue
    expect(plan.skip).toBeUndefined();
    expect(plan.totalSeconds).toBe(7.5 * 3600);
  });

  it("Monday: Solfeggio 14:00-15:30 -> 6.0h", () => {
    const { plan } = planDay({ ...commonArgs, date: "2026-08-24" }); // Mon
    expect(plan.totalSeconds).toBe(6.0 * 3600);
  });

  it("Wednesday: Dance 17:00-19:00 clips to 17:00-18:00 -> 6.5h", () => {
    const { plan } = planDay({ ...commonArgs, date: "2026-08-26" }); // Wed
    expect(plan.totalSeconds).toBe(6.5 * 3600);
    const workBlocks = plan.entries.filter((e) => e.kind !== "meeting");
    const lastBlockEnd = workBlocks.at(-1)!.endLocal;
    expect(DateTime.fromISO(lastBlockEnd).toFormat("HH:mm")).toBe("17:00"); // stops where the class starts, not 19:00
  });

  it("Thursday: Solfeggio 14:00-15:30 -> 6.0h", () => {
    const { plan } = planDay({ ...commonArgs, date: "2026-08-27" }); // Thu
    expect(plan.totalSeconds).toBe(6.0 * 3600);
  });

  it("Friday: Italian 15:00-16:30 inside window, Expression 18:00-21:00 outside window -> 6.0h", () => {
    const { plan } = planDay({ ...commonArgs, date: "2026-08-28" }); // Fri
    expect(plan.totalSeconds).toBe(6.0 * 3600);
  });

  it("full week totals 32.0h", () => {
    const weekPlan = buildWeekPlan({
      weekStart: "2026-08-24",
      weekEnd: "2026-08-28",
      config: baseConfig,
      gitEvents: commonArgs.gitEvents,
      calendarEvents: [],
      existingEntries: [],
    });
    expect(weekPlan.totalSeconds).toBe(32.0 * 3600);
  });
});

describe("planDay - class events on the calendar must never bill the client", () => {
  it("a 'Dance class' calendar event produces no Toggl entry at all", () => {
    const { plan } = planDay({
      date: "2026-08-26", // Wed, no config class for this test - only the calendar copy
      config: { ...baseConfig, classes: [] },
      gitEvents: [gitEvent("2026-08-26", "09:00", "fix/FFT-1-x", "FFT-1")],
      calendarEvents: [{ title: "Dance class", start: "2026-08-26T17:00:00-03:00", end: "2026-08-26T19:00:00-03:00" }],
      existingEntries: [],
      priorTicket: null,
    });
    const namedDanceClass = plan.entries.find((e) => e.description === "Dance class");
    expect(namedDanceClass).toBeUndefined();
    // and it still ate the 17:00-18:00 chunk of the workday, same as the config-driven version
    expect(plan.totalSeconds).toBe(6.5 * 3600);
  });
});

describe("planDay - meetings", () => {
  it("a real meeting becomes its own entry, named after the event, and reduces ticket time", () => {
    const { plan } = planDay({
      date: "2026-08-25", // Tue, no classes
      config: baseConfig,
      gitEvents: [gitEvent("2026-08-25", "09:00", "fix/FFT-1-x", "FFT-1", { kind: "commit", description: "FFT-1: work" })],
      calendarEvents: [{ title: "MYR APP - Daily Huddle", start: "2026-08-25T10:00:00-03:00", end: "2026-08-25T10:15:00-03:00" }],
      existingEntries: [],
      priorTicket: null,
    });
    const meeting = plan.entries.find((e) => e.kind === "meeting");
    expect(meeting?.description).toBe("MYR APP - Daily Huddle");
    expect(plan.totalSeconds).toBe(7.5 * 3600); // meeting time is carved out of, not added to, the day
  });

  it("a calendar event given in UTC is still clipped correctly against the local workday window", () => {
    // 13:00 UTC on 2026-08-25 is 10:00 America/Montevideo (-03) - right at the window's start.
    const { plan } = planDay({
      date: "2026-08-25",
      config: baseConfig,
      gitEvents: [],
      calendarEvents: [{ title: "Standup", start: "2026-08-25T13:00:00Z", end: "2026-08-25T13:15:00Z" }],
      existingEntries: [],
      priorTicket: null,
    });
    const meeting = plan.entries.find((e) => e.kind === "meeting");
    expect(DateTime.fromISO(meeting!.startLocal).toFormat("HH:mm")).toBe("10:00");
  });

  it("a meeting entirely inside lunch produces no entry and does not inflate the day total", () => {
    const { plan } = planDay({
      date: "2026-08-25", // Tue, no classes; lunch is 13:00-13:30
      config: baseConfig,
      gitEvents: [gitEvent("2026-08-25", "09:00", "fix/FFT-1-x", "FFT-1", { kind: "commit", description: "FFT-1: work" })],
      calendarEvents: [{ title: "Standup", start: "2026-08-25T13:05:00-03:00", end: "2026-08-25T13:20:00-03:00" }],
      existingEntries: [],
      priorTicket: null,
    });
    expect(plan.entries.some((e) => e.kind === "meeting")).toBe(false);
    expect(plan.totalSeconds).toBe(7.5 * 3600); // same as a day with no meeting at all - lunch already accounted for it
  });

  it("a meeting straddling the end of lunch is clipped to only its non-lunch portion", () => {
    const { plan } = planDay({
      date: "2026-08-25", // lunch is 13:00-13:30
      config: baseConfig,
      gitEvents: [gitEvent("2026-08-25", "09:00", "fix/FFT-1-x", "FFT-1", { kind: "commit", description: "FFT-1: work" })],
      calendarEvents: [{ title: "Post-lunch sync", start: "2026-08-25T13:15:00-03:00", end: "2026-08-25T13:45:00-03:00" }],
      existingEntries: [],
      priorTicket: null,
    });
    const meeting = plan.entries.find((e) => e.kind === "meeting");
    expect(DateTime.fromISO(meeting!.startLocal).toFormat("HH:mm")).toBe("13:30"); // not 13:15 - that part was already lunch
    expect(meeting!.durationSeconds).toBe(15 * 60);
    // Day total is unchanged from a plain 7.5h day: the meeting's first 15min
    // coincided with lunch (already excluded), and its second 15min was
    // already-free time that's now labeled "meeting" instead of "ticket" -
    // relabeled, not added on top.
    expect(plan.totalSeconds).toBe(7.5 * 3600);
  });
});

describe("planDay - ticket attribution fallbacks", () => {
  it("falls back to the prior day's ticket when there is zero git signal that day", () => {
    const { plan } = planDay({
      date: "2026-08-25",
      config: baseConfig,
      gitEvents: [], // nothing happened this day
      calendarEvents: [],
      existingEntries: [],
      priorTicket: { ticket: "FFT-42", description: "FFT-42: yesterday's work" },
    });
    expect(plan.entries.every((e) => e.description === "FFT-42: yesterday's work")).toBe(true);
  });

  it("emits an unassigned placeholder when there is no git signal and no prior ticket", () => {
    const { plan } = planDay({
      date: "2026-08-25",
      config: baseConfig,
      gitEvents: [],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    });
    expect(plan.entries.every((e) => e.kind === "unassigned")).toBe(true);
  });
});

describe("planDay - splitting a free block by commits", () => {
  // lunchMinutes: 0 collapses the workday into a single free block (10:00-18:00) with no
  // lunch-driven split, isolating the commit-splitting behavior from lunch/class carving.
  const oneBlockConfig: Config = { ...baseConfig, workday: { ...baseConfig.workday, lunchMinutes: 0 } };

  it("splits one block at each commit: 3 commits (2 tickets) -> 4 entries, each with its own message", () => {
    const { plan, carryTicket } = planDay({
      date: "2026-08-25", // Tue, no classes
      config: oneBlockConfig,
      gitEvents: [
        gitEvent("2026-08-25", "11:00", "fix/FOO-1-x", "FOO-1", { kind: "commit", description: "FOO-1: added endpoint" }),
        gitEvent("2026-08-25", "13:00", "fix/BAR-2-y", "BAR-2", { kind: "commit", description: "BAR-2: fixed crash" }),
        gitEvent("2026-08-25", "15:00", "fix/BAR-2-y", "BAR-2", { kind: "commit", description: "BAR-2: added tests" }),
      ],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    });

    expect(plan.entries).toHaveLength(4);
    expect(DateTime.fromISO(plan.entries[0].endLocal).toFormat("HH:mm")).toBe("11:00");
    expect(plan.entries[1]).toMatchObject({ description: "FOO-1: added endpoint" });
    expect(DateTime.fromISO(plan.entries[1].endLocal).toFormat("HH:mm")).toBe("13:00");
    expect(plan.entries[2]).toMatchObject({ description: "BAR-2: fixed crash" });
    expect(DateTime.fromISO(plan.entries[2].endLocal).toFormat("HH:mm")).toBe("15:00");
    expect(plan.entries[3]).toMatchObject({ description: "BAR-2: added tests" });
    expect(DateTime.fromISO(plan.entries[3].endLocal).toFormat("HH:mm")).toBe("18:00");
    // several commits on the SAME ticket (BAR-2) still keep their own distinct messages
    // instead of collapsing into one "best" description for the ticket - the user's ask.
    expect(plan.entries[2].description).not.toBe(plan.entries[3].description);
    expect(carryTicket).toEqual({ ticket: "BAR-2", description: "BAR-2: added tests" });
  });

  it("splitting a block does not change the day's total tracked time", () => {
    const oneCommit = planDay({
      date: "2026-08-25",
      config: oneBlockConfig,
      gitEvents: [gitEvent("2026-08-25", "09:00", "fix/FOO-1-x", "FOO-1", { kind: "commit", description: "FOO-1: work" })],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    }).plan;
    const fiveCommits = planDay({
      date: "2026-08-25",
      config: oneBlockConfig,
      gitEvents: [
        gitEvent("2026-08-25", "10:30", "fix/FOO-1-x", "FOO-1", { kind: "commit", description: "a" }),
        gitEvent("2026-08-25", "11:00", "fix/FOO-1-x", "FOO-1", { kind: "commit", description: "b" }),
        gitEvent("2026-08-25", "12:00", "fix/BAR-2-y", "BAR-2", { kind: "commit", description: "c" }),
        gitEvent("2026-08-25", "14:00", "fix/BAR-2-y", "BAR-2", { kind: "commit", description: "d" }),
        gitEvent("2026-08-25", "16:00", "fix/BAR-2-y", "BAR-2", { kind: "commit", description: "e" }),
      ],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    }).plan;
    expect(fiveCommits.totalSeconds).toBe(oneCommit.totalSeconds);
    expect(fiveCommits.entries.length).toBeGreaterThan(oneCommit.entries.length);
  });

  it("entries inside a split block are contiguous - no gaps or overlaps introduced by splitting", () => {
    const { plan } = planDay({
      date: "2026-08-25",
      config: oneBlockConfig,
      gitEvents: [
        gitEvent("2026-08-25", "11:00", "fix/FOO-1-x", "FOO-1", { kind: "commit", description: "a" }),
        gitEvent("2026-08-25", "14:00", "fix/BAR-2-y", "BAR-2", { kind: "commit", description: "b" }),
      ],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    });
    for (let i = 1; i < plan.entries.length; i++) {
      expect(plan.entries[i].startLocal).toBe(plan.entries[i - 1].endLocal);
    }
  });

  it("an amend right after its own commit, keeping the same message, merges back into one entry", () => {
    const { plan } = planDay({
      date: "2026-08-25",
      config: oneBlockConfig,
      gitEvents: [
        gitEvent("2026-08-25", "11:00", "fix/FOO-1-x", "FOO-1", { kind: "commit", description: "FOO-1: same text" }),
        gitEvent("2026-08-25", "11:05", "fix/FOO-1-x", "FOO-1", { kind: "commit-amend", description: "FOO-1: same text" }),
      ],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    });
    // FOO-1 is the only ticket all day, so the fallback segment (10:00-11:00) also resolves to
    // "FOO-1: same text" - all three segments (fallback, commit, amend) merge into a single entry.
    expect(plan.entries).toHaveLength(1);
    expect(plan.entries[0]).toMatchObject({ description: "FOO-1: same text" });
    expect(DateTime.fromISO(plan.entries[0].startLocal).toFormat("HH:mm")).toBe("10:00");
    expect(DateTime.fromISO(plan.entries[0].endLocal).toFormat("HH:mm")).toBe("18:00");
  });

  it("a pull/reset event inside a block does not split it - only commits do", () => {
    const { plan } = planDay({
      date: "2026-08-25",
      config: oneBlockConfig,
      gitEvents: [
        gitEvent("2026-08-25", "11:00", "fix/FOO-1-x", "FOO-1", { kind: "commit", description: "FOO-1: work" }),
        gitEvent("2026-08-25", "14:00", "fix/FOO-1-x", "FOO-1", { kind: "pull", description: null }),
        gitEvent("2026-08-25", "16:00", "fix/BAR-2-y", "BAR-2", { kind: "commit", description: "BAR-2: other work" }),
      ],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    });
    // If the pull at 14:00 split the block, there would be a boundary there; instead the only
    // boundary is at 16:00, where the real (BAR-2) commit is.
    expect(plan.entries).toHaveLength(2);
    expect(plan.entries[0]).toMatchObject({ description: "FOO-1: work" });
    expect(DateTime.fromISO(plan.entries[0].endLocal).toFormat("HH:mm")).toBe("16:00");
    expect(plan.entries[1]).toMatchObject({ description: "BAR-2: other work" });
  });

  it("a commit that falls during lunch never gets its own entry, but still labels the blocks around it", () => {
    const { plan } = planDay({
      date: "2026-08-25", // baseConfig lunch is 13:00-13:30
      config: baseConfig,
      gitEvents: [gitEvent("2026-08-25", "13:10", "fix/FOO-1-x", "FOO-1", { kind: "commit", description: "FOO-1: over lunch" })],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    });
    expect(plan.entries.every((e) => e.description === "FOO-1: over lunch")).toBe(true);
    expect(plan.entries).toHaveLength(2); // morning block + afternoon block, lunch itself carved out
    expect(plan.totalSeconds).toBe(7.5 * 3600); // same total as the plain single-event-before-window case
  });

  it("a zero-commit block behaves exactly as before splitting existed (backcompat gate)", () => {
    const { plan, carryTicket } = planDay({
      date: "2026-08-25",
      config: baseConfig,
      gitEvents: [gitEvent("2026-08-25", "09:00", "fix/FFT-1-x", "FFT-1", { kind: "commit", description: "FFT-1: work" })],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    });
    expect(plan.entries).toHaveLength(2); // morning block, afternoon block - one entry each, as today
    expect(plan.entries.every((e) => e.description === "FFT-1: work")).toBe(true);
    expect(plan.totalSeconds).toBe(7.5 * 3600);
    expect(carryTicket).toEqual({ ticket: "FFT-1", description: "FFT-1: work" });
  });
});

describe("planDay - skip conditions", () => {
  it("skips weekends as not-a-workday", () => {
    const { plan } = planDay({
      date: "2026-08-22", // Sat
      config: baseConfig,
      gitEvents: [],
      calendarEvents: [],
      existingEntries: [],
      priorTicket: null,
    });
    expect(plan.skip).toBe("not-a-workday");
    expect(plan.entries).toHaveLength(0);
  });

  it("skips a day that already has Toggl entries, and does not overwrite them", () => {
    const { plan, carryTicket } = planDay({
      date: "2026-08-25",
      config: baseConfig,
      gitEvents: [gitEvent("2026-08-25", "09:00", "fix/FFT-1-x", "FFT-1")],
      calendarEvents: [],
      existingEntries: [{ id: 1, start: "2026-08-25T13:00:00Z", stop: "2026-08-25T14:00:00Z" }],
      priorTicket: { ticket: "FFT-old", description: "carried" },
    });
    expect(plan.skip).toBe("already-tracked");
    expect(plan.entries).toHaveLength(0);
    expect(carryTicket).toEqual({ ticket: "FFT-old", description: "carried" }); // unchanged, we learned nothing new
  });
});
