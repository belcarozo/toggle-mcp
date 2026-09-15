import { DateTime } from "luxon";
import { DEFAULT_TICKET_PATTERN } from "./defaults.js";
import { extractTicket } from "./ticket.js";
import { clipToWindow, type Interval } from "./time.js";
import type { ContextNoteInput } from "./types.js";

/**
 * A tier-2 signal about what was being worked on - from a Claude Code session transcript
 * or a caller-supplied note (e.g. a Slack thread). Deliberately not a GitEvent: it's only
 * ever consulted to fill a gap in git-derived attribution, never to outrank a real commit
 * message or skew ticket-dominance counts. A point-in-time signal (a single Slack message)
 * has `end === start`.
 */
export interface ContextSignal {
  start: DateTime;
  end: DateTime;
  repo: string | null;
  branch: string | null;
  ticket: string | null;
  text: string;
  source: "session" | "slack";
}

const MAX_SIGNAL_TEXT_LENGTH = 160;

/** Collapse to something safe to write verbatim into a Toggl description: one line, capped length. */
export function sanitizeSignalText(text: string): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  return oneLine.length > MAX_SIGNAL_TEXT_LENGTH ? `${oneLine.slice(0, MAX_SIGNAL_TEXT_LENGTH - 1)}…` : oneLine;
}

/** Turn caller-supplied notes (e.g. Slack thread excerpts) into signals. Invalid start/end are dropped. */
export function signalsFromNotes(
  notes: ContextNoteInput[],
  ticketPattern: string = DEFAULT_TICKET_PATTERN,
): ContextSignal[] {
  return notes
    .map((note) => {
      const start = DateTime.fromISO(note.start);
      const end = DateTime.fromISO(note.end);
      return {
        start,
        end,
        repo: null,
        branch: null,
        ticket: extractTicket(note.text, ticketPattern),
        text: sanitizeSignalText(note.text),
        source: note.source ?? ("slack" as const),
      };
    })
    .filter((s) => s.start.isValid && s.end.isValid);
}

/** Overlap in ms with `interval`; a point signal counts as fully covering it when contained. -1 means no match. */
function overlapScore(signal: ContextSignal, interval: Interval): number {
  const isPoint = signal.start.toMillis() === signal.end.toMillis();
  if (isPoint) {
    const t = signal.start.toMillis();
    if (t < interval.start.toMillis() || t > interval.end.toMillis()) return -1;
    return interval.end.toMillis() - interval.start.toMillis();
  }
  const clipped = clipToWindow({ start: signal.start, end: signal.end }, interval);
  return clipped ? clipped.end.toMillis() - clipped.start.toMillis() : -1;
}

export interface PickSignalOptions {
  /**
   * Only consider signals whose own `ticket` matches exactly - use this when enriching an
   * attribution that already has a known ticket, so a same-time but unrelated (or
   * ticket-agnostic) note can't overwrite a perfectly fine description with the wrong topic.
   * Omit it only when there's no existing ticket to protect (a fully unassigned segment).
   */
  requireTicket?: string;
}

/** The signal that overlaps `interval` the most, ties broken by the more recent one. Null if none overlap/match. */
export function pickSignal(interval: Interval, signals: ContextSignal[], options: PickSignalOptions = {}): ContextSignal | null {
  const candidates = options.requireTicket ? signals.filter((s) => s.ticket === options.requireTicket) : signals;
  let best: ContextSignal | null = null;
  let bestScore = -1;
  for (const signal of candidates) {
    const score = overlapScore(signal, interval);
    if (score < 0) continue;
    if (score > bestScore || (score === bestScore && best !== null && signal.start.toMillis() > best.start.toMillis())) {
      best = signal;
      bestScore = score;
    }
  }
  return best;
}
