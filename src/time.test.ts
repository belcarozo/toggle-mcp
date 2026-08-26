import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { atLocalTime, clipToWindow, mergeIntervals, resolveWeek, subtractIntervals, toTogglUtc } from "./time.js";

const ZONE = "America/Montevideo";

describe("subtractIntervals", () => {
  it("removes a single interior block, leaving two pieces", () => {
    const window = { start: atLocalTime("2026-08-24", "10:00", ZONE), end: atLocalTime("2026-08-24", "18:00", ZONE) };
    const lunch = { start: atLocalTime("2026-08-24", "13:00", ZONE), end: atLocalTime("2026-08-24", "13:30", ZONE) };
    const pieces = subtractIntervals(window, [lunch]);
    expect(pieces).toHaveLength(2);
    expect(pieces[0].start.toFormat("HH:mm")).toBe("10:00");
    expect(pieces[0].end.toFormat("HH:mm")).toBe("13:00");
    expect(pieces[1].start.toFormat("HH:mm")).toBe("13:30");
    expect(pieces[1].end.toFormat("HH:mm")).toBe("18:00");
  });

  it("clips a subtracted interval that runs past the window end (the Wednesday dance-class case)", () => {
    const window = { start: atLocalTime("2026-08-26", "10:00", ZONE), end: atLocalTime("2026-08-26", "18:00", ZONE) };
    const dance = { start: atLocalTime("2026-08-26", "17:00", ZONE), end: atLocalTime("2026-08-26", "19:00", ZONE) };
    const pieces = subtractIntervals(window, [dance]);
    expect(pieces).toHaveLength(1);
    expect(pieces[0].end.toFormat("HH:mm")).toBe("17:00");
  });

  it("ignores a subtracted interval entirely outside the window (the Friday expression-class case)", () => {
    const window = { start: atLocalTime("2026-08-28", "10:00", ZONE), end: atLocalTime("2026-08-28", "18:00", ZONE) };
    const expression = { start: atLocalTime("2026-08-28", "18:00", ZONE), end: atLocalTime("2026-08-28", "21:00", ZONE) };
    const pieces = subtractIntervals(window, [expression]);
    expect(pieces).toHaveLength(1);
    expect(pieces[0].start.toFormat("HH:mm")).toBe("10:00");
    expect(pieces[0].end.toFormat("HH:mm")).toBe("18:00");
  });
});

describe("mergeIntervals / clipToWindow", () => {
  it("merges two overlapping intervals into one", () => {
    const a = { start: atLocalTime("2026-08-24", "10:00", ZONE), end: atLocalTime("2026-08-24", "11:00", ZONE) };
    const b = { start: atLocalTime("2026-08-24", "10:30", ZONE), end: atLocalTime("2026-08-24", "12:00", ZONE) };
    const merged = mergeIntervals([a, b]);
    expect(merged).toHaveLength(1);
    expect(merged[0].end.toFormat("HH:mm")).toBe("12:00");
  });

  it("clipToWindow returns null when there is no overlap", () => {
    const window = { start: atLocalTime("2026-08-24", "10:00", ZONE), end: atLocalTime("2026-08-24", "18:00", ZONE) };
    const outside = { start: atLocalTime("2026-08-24", "19:00", ZONE), end: atLocalTime("2026-08-24", "20:00", ZONE) };
    expect(clipToWindow(outside, window)).toBeNull();
  });
});

describe("toTogglUtc", () => {
  it("formats America/Montevideo (-03) as the exact Toggl RFC3339 shape", () => {
    const dt = atLocalTime("2026-08-24", "10:00", ZONE);
    expect(toTogglUtc(dt)).toBe("2026-08-24T13:00:00Z");
  });
});

describe("resolveWeek", () => {
  it('"this" week never extends past today', () => {
    const now = DateTime.fromISO("2026-08-26T12:00:00", { zone: ZONE }); // a Wednesday
    const range = resolveWeek("this", ZONE, now);
    expect(range).toEqual({ weekStart: "2026-08-24", weekEnd: "2026-08-26" });
  });

  it('"last" week is always the previous Mon-Fri', () => {
    const now = DateTime.fromISO("2026-08-26T12:00:00", { zone: ZONE });
    const range = resolveWeek("last", ZONE, now);
    expect(range).toEqual({ weekStart: "2026-08-17", weekEnd: "2026-08-21" });
  });
});
