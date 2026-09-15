import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { pickSignal, sanitizeSignalText, signalsFromNotes, type ContextSignal } from "./context.js";
import type { ContextNoteInput } from "./types.js";

const ZONE = "America/Montevideo";

function at(time: string): DateTime {
  return DateTime.fromISO(`2026-08-25T${time}`, { zone: ZONE });
}

function rangedSignal(overrides: Partial<ContextSignal> = {}): ContextSignal {
  return {
    start: at("10:00:00"),
    end: at("11:00:00"),
    repo: "myr",
    branch: "fix/FFT-1-x",
    ticket: "FFT-1",
    text: "Debug the thing",
    source: "session",
    ...overrides,
  };
}

describe("sanitizeSignalText", () => {
  it("collapses internal whitespace/newlines to single spaces and trims", () => {
    expect(sanitizeSignalText("  Debug   the\nthing  ")).toBe("Debug the thing");
  });

  it("caps overly long text with an ellipsis", () => {
    const long = "x".repeat(200);
    const result = sanitizeSignalText(long);
    expect(result.length).toBe(160);
    expect(result.endsWith("…")).toBe(true);
  });
});

describe("signalsFromNotes", () => {
  it("maps a caller note into a point-free-form signal, recovering a ticket from its text", () => {
    const notes: ContextNoteInput[] = [
      { text: "FFT-1402: discussed the systematic debugging approach in #eng", start: "2026-08-25T10:00:00-03:00", end: "2026-08-25T10:05:00-03:00" },
    ];
    const [signal] = signalsFromNotes(notes);
    expect(signal.ticket).toBe("FFT-1402");
    expect(signal.source).toBe("slack");
    expect(signal.repo).toBeNull();
  });

  it("respects an explicit source", () => {
    const notes: ContextNoteInput[] = [{ text: "no ticket here", start: "2026-08-25T10:00:00-03:00", end: "2026-08-25T10:00:00-03:00", source: "session" }];
    expect(signalsFromNotes(notes)[0].source).toBe("session");
  });

  it("drops a note with an invalid start/end", () => {
    const notes: ContextNoteInput[] = [{ text: "bad", start: "not-a-date", end: "2026-08-25T10:00:00-03:00" }];
    expect(signalsFromNotes(notes)).toHaveLength(0);
  });
});

describe("pickSignal", () => {
  const interval = { start: at("10:00:00"), end: at("11:00:00") };

  it("returns null when no signal overlaps the interval", () => {
    const signal = rangedSignal({ start: at("13:00:00"), end: at("14:00:00") });
    expect(pickSignal(interval, [signal])).toBeNull();
  });

  it("picks the signal with the longest overlap", () => {
    const short = rangedSignal({ start: at("10:45:00"), end: at("11:00:00"), text: "short overlap" });
    const long = rangedSignal({ start: at("09:30:00"), end: at("10:45:00"), text: "long overlap" });
    expect(pickSignal(interval, [short, long])?.text).toBe("long overlap");
  });

  it("a point-in-time signal contained in the interval is matched", () => {
    const point = rangedSignal({ start: at("10:30:00"), end: at("10:30:00"), text: "point inside" });
    expect(pickSignal(interval, [point])?.text).toBe("point inside");
  });

  it("a point-in-time signal outside the interval is not matched", () => {
    const point = rangedSignal({ start: at("12:00:00"), end: at("12:00:00"), text: "point outside" });
    expect(pickSignal(interval, [point])).toBeNull();
  });

  it("ties are broken by the more recent signal", () => {
    const older = rangedSignal({ start: at("10:30:00"), end: at("10:30:00"), text: "older point" });
    const newer = rangedSignal({ start: at("10:45:00"), end: at("10:45:00"), text: "newer point" });
    expect(pickSignal(interval, [older, newer])?.text).toBe("newer point");
  });

  it("requireTicket excludes a better-overlapping signal that names a different ticket", () => {
    const wrongTicket = rangedSignal({ start: at("09:30:00"), end: at("11:00:00"), ticket: "OTHER-1", text: "unrelated, long overlap" });
    const rightTicket = rangedSignal({ start: at("10:45:00"), end: at("11:00:00"), ticket: "FFT-1", text: "matching, short overlap" });
    expect(pickSignal(interval, [wrongTicket, rightTicket], { requireTicket: "FFT-1" })?.text).toBe("matching, short overlap");
  });

  it("requireTicket excludes a ticket-agnostic signal too", () => {
    const noTicket = rangedSignal({ ticket: null, text: "generic" });
    expect(pickSignal(interval, [noTicket], { requireTicket: "FFT-1" })).toBeNull();
  });

  it("requireTicket returns null when nothing matches", () => {
    const signal = rangedSignal({ ticket: "OTHER-1" });
    expect(pickSignal(interval, [signal], { requireTicket: "FFT-1" })).toBeNull();
  });
});
