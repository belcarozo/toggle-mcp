import { DateTime } from "luxon";
import { DEFAULT_TICKET_PATTERN } from "./defaults.js";
import { extractTicket } from "./ticket.js";
import { clipToWindow } from "./time.js";
const MAX_SIGNAL_TEXT_LENGTH = 160;
/** Collapse to something safe to write verbatim into a Toggl description: one line, capped length. */
export function sanitizeSignalText(text) {
    const oneLine = text.replace(/\s+/g, " ").trim();
    return oneLine.length > MAX_SIGNAL_TEXT_LENGTH ? `${oneLine.slice(0, MAX_SIGNAL_TEXT_LENGTH - 1)}…` : oneLine;
}
/** Turn caller-supplied notes (e.g. Slack thread excerpts) into signals. Invalid start/end are dropped. */
export function signalsFromNotes(notes, ticketPattern = DEFAULT_TICKET_PATTERN) {
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
            source: note.source ?? "slack",
        };
    })
        .filter((s) => s.start.isValid && s.end.isValid);
}
/** Overlap in ms with `interval`; a point signal counts as fully covering it when contained. -1 means no match. */
function overlapScore(signal, interval) {
    const isPoint = signal.start.toMillis() === signal.end.toMillis();
    if (isPoint) {
        const t = signal.start.toMillis();
        if (t < interval.start.toMillis() || t > interval.end.toMillis())
            return -1;
        return interval.end.toMillis() - interval.start.toMillis();
    }
    const clipped = clipToWindow({ start: signal.start, end: signal.end }, interval);
    return clipped ? clipped.end.toMillis() - clipped.start.toMillis() : -1;
}
/** The signal that overlaps `interval` the most, ties broken by the more recent one. Null if none overlap/match. */
export function pickSignal(interval, signals, options = {}) {
    const candidates = options.requireTicket ? signals.filter((s) => s.ticket === options.requireTicket) : signals;
    let best = null;
    let bestScore = -1;
    for (const signal of candidates) {
        const score = overlapScore(signal, interval);
        if (score < 0)
            continue;
        if (score > bestScore || (score === bestScore && best !== null && signal.start.toMillis() > best.start.toMillis())) {
            best = signal;
            bestScore = score;
        }
    }
    return best;
}
//# sourceMappingURL=context.js.map