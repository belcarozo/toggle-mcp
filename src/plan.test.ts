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
  calendarIds: ["belen.carozo@people.inc"],
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
  authorEmails: ["belen.carozo@people.inc"],
  minEntryMinutes: 15,
  roundToMinutes: 15,
  tags: ["auto-baseline"],
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
