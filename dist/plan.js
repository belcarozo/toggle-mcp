import { DateTime } from "luxon";
import { pickSignal } from "./context.js";
import { attributeTicket, withTicketPrefix } from "./ticket.js";
import { atLocalTime, clipToWindow, durationSeconds, mergeIntervals, roundInterval, subtractIntervals, toTogglUtc, weekdayOf, } from "./time.js";
function isNonWorkTitle(title, patterns) {
    return patterns.some((p) => new RegExp(p, "i").test(title));
}
function toEntry(kind, description, interval, tags) {
    return {
        kind,
        description,
        startLocal: interval.start.toISO(),
        endLocal: interval.end.toISO(),
        startUtc: toTogglUtc(interval.start),
        stopUtc: toTogglUtc(interval.end),
        durationSeconds: durationSeconds(interval),
        tags,
    };
}
/** Ticket with the most events that day, tied broken by whichever occurred most recently. */
function dominantTicket(events) {
    if (events.length === 0)
        return null;
    const counts = new Map();
    for (const e of events)
        counts.set(e.ticket, (counts.get(e.ticket) ?? 0) + 1);
    const maxCount = Math.max(...counts.values());
    const candidates = events.filter((e) => counts.get(e.ticket) === maxCount);
    return candidates.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())[0];
}
function assignTicket(blockStart, dayEvents, priorTicket, ticketPattern) {
    const beforeOrAt = dayEvents
        .filter((e) => e.timestamp.toMillis() <= blockStart.toMillis())
        .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
    const winner = beforeOrAt[0] ?? dominantTicket(dayEvents);
    if (winner) {
        const sameTicketEvents = dayEvents.filter((e) => e.ticket === winner.ticket);
        return attributeTicket(winner.ticket, sameTicketEvents, ticketPattern);
    }
    return priorTicket;
}
const COMMIT_KINDS = ["commit", "commit-merge", "commit-amend"];
/**
 * Split an already-rounded free block at the commits inside it, attributing each segment to the
 * commit that ends it - the work that produced that commit. The stretch after the last commit
 * continues that commit's attribution (work in progress, not yet committed). A block with no
 * commits inside it returns a single segment covering the whole block, attributed via `fallback` -
 * identical to today's whole-block behavior.
 */
function sameAttribution(a, b) {
    if (a === null || b === null)
        return a === b;
    return a.ticket === b.ticket && a.description === b.description;
}
/** Collapse consecutive segments that ended up with the identical attribution - e.g. an amend
 * right after its own commit, keeping the same message, would otherwise split into two entries
 * that say the same thing. */
function mergeAdjacentSegments(segments) {
    const merged = [];
    for (const segment of segments) {
        const last = merged[merged.length - 1];
        if (last && sameAttribution(last.attribution, segment.attribution)) {
            last.interval = { start: last.interval.start, end: segment.interval.end };
        }
        else {
            merged.push({ interval: segment.interval, attribution: segment.attribution });
        }
    }
    return merged;
}
export function splitBlockByCommits(block, dayEvents, fallback, ticketPattern) {
    const commits = dayEvents
        .filter((e) => COMMIT_KINDS.includes(e.kind))
        .filter((e) => e.timestamp.toMillis() > block.start.toMillis() && e.timestamp.toMillis() < block.end.toMillis())
        .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
    if (commits.length === 0) {
        return [{ interval: block, attribution: fallback }];
    }
    const segments = [];
    let cursor = block.start;
    let attribution = fallback;
    for (const commit of commits) {
        segments.push({ interval: { start: cursor, end: commit.timestamp }, attribution });
        attribution = attributeTicket(commit.ticket, [commit], ticketPattern);
        cursor = commit.timestamp;
    }
    segments.push({ interval: { start: cursor, end: block.end }, attribution });
    return mergeAdjacentSegments(segments);
}
const UNASSIGNED_PLACEHOLDER = "(unassigned - fill in by hand)";
/**
 * Fill a gap in git-derived attribution from the best overlapping context signal, if any -
 * never touching an attribution that already came from a real commit message. A weak
 * (branch-slug) attribution gets its description text replaced, keeping its ticket; a fully
 * unassigned segment is promoted to a ticket entry if the signal names one, else stays
 * unassigned with the signal's text appended so it's still flagged for manual review.
 */
function applyContextSignal(attribution, interval, contextSignals) {
    if ((attribution && !attribution.weak) || contextSignals.length === 0) {
        return { attribution, unassignedText: UNASSIGNED_PLACEHOLDER };
    }
    if (attribution) {
        // Weak: only a signal that names this exact ticket is trusted to replace the description -
        // a same-time but unrelated (or ticket-agnostic) note is more likely to mislead than help
        // when there's already a specific, if unglamorous, branch-derived description.
        const signal = pickSignal(interval, contextSignals, { requireTicket: attribution.ticket });
        if (!signal)
            return { attribution, unassignedText: UNASSIGNED_PLACEHOLDER };
        return {
            // Stays `weak: true` - this still isn't a real commit message, so a later gap that
            // carries this forward as `priorTicket` (no git signal of its own that day/block) must
            // remain eligible to look up its own, fresher signal instead of freezing this one in.
            attribution: { ticket: attribution.ticket, description: withTicketPrefix(attribution.ticket, signal.text), weak: true },
            unassignedText: UNASSIGNED_PLACEHOLDER,
        };
    }
    // Fully unassigned: there's no existing ticket to protect, so any overlapping signal helps.
    const signal = pickSignal(interval, contextSignals);
    if (!signal)
        return { attribution: null, unassignedText: UNASSIGNED_PLACEHOLDER };
    if (signal.ticket) {
        return {
            attribution: { ticket: signal.ticket, description: withTicketPrefix(signal.ticket, signal.text), weak: true },
            unassignedText: UNASSIGNED_PLACEHOLDER,
        };
    }
    return { attribution: null, unassignedText: `${UNASSIGNED_PLACEHOLDER} — ${signal.text}` };
}
export function planDay(params) {
    const { date, config, existingEntries, priorTicket, contextSignals = [] } = params;
    const zone = config.timezone;
    const weekday = weekdayOf(atLocalTime(date, "00:00", zone));
    if (!config.workday.days.includes(weekday)) {
        return {
            plan: { date, weekday, skip: "not-a-workday", entries: [], totalSeconds: 0 },
            carryTicket: priorTicket,
        };
    }
    if (existingEntries.length > 0) {
        return {
            plan: { date, weekday, skip: "already-tracked", entries: [], totalSeconds: 0 },
            carryTicket: priorTicket,
        };
    }
    const window = {
        start: atLocalTime(date, config.workday.start, zone),
        end: atLocalTime(date, config.workday.end, zone),
    };
    const dayEvents = params.gitEvents.filter((e) => e.timestamp.toISODate() === date);
    const calendarIntervals = params.calendarEvents
        .map((ev) => {
        const start = DateTime.fromISO(ev.start).setZone(zone);
        const end = DateTime.fromISO(ev.end).setZone(zone);
        if (!start.isValid || !end.isValid)
            return null;
        const clipped = clipToWindow({ start, end }, window);
        if (!clipped)
            return null;
        return { title: ev.title, interval: clipped };
    })
        .filter((x) => x !== null);
    const calendarClassIntervals = calendarIntervals
        .filter((c) => isNonWorkTitle(c.title, config.nonWorkTitlePatterns))
        .map((c) => c.interval);
    const meetings = calendarIntervals.filter((c) => !isNonWorkTitle(c.title, config.nonWorkTitlePatterns));
    // dedupe identical title+interval pairs (e.g. the same event surfaced twice by an upstream calendar merge)
    const seenMeetingKeys = new Set();
    const dedupedMeetings = meetings.filter((m) => {
        const key = `${m.title}|${m.interval.start.toMillis()}|${m.interval.end.toMillis()}`;
        if (seenMeetingKeys.has(key))
            return false;
        seenMeetingKeys.add(key);
        return true;
    });
    const configClassIntervals = config.classes
        .filter((c) => c.day === weekday)
        .map((c) => clipToWindow({ start: atLocalTime(date, c.start, zone), end: atLocalTime(date, c.end, zone) }, window))
        .filter((x) => x !== null);
    const lunchInterval = {
        start: atLocalTime(date, config.workday.lunchAt, zone),
        end: atLocalTime(date, config.workday.lunchAt, zone).plus({ minutes: config.workday.lunchMinutes }),
    };
    // Time that was never available to begin with (lunch/classes), independent of meetings.
    const unavailable = mergeIntervals([...configClassIntervals, ...calendarClassIntervals, lunchInterval]);
    // A meeting that falls inside lunch/a class isn't extra work on top of that -
    // it's the same slot. Clip each meeting down to only the portion that overlaps
    // otherwise-free time before it becomes its own entry; a meeting entirely
    // inside lunch/a class produces no entry at all.
    const clippedMeetings = dedupedMeetings.flatMap((meeting) => subtractIntervals(meeting.interval, unavailable).map((interval) => ({ title: meeting.title, interval })));
    const nonWork = mergeIntervals([...unavailable, ...clippedMeetings.map((m) => m.interval)]);
    const freeBlocks = subtractIntervals(window, nonWork).filter((b) => durationSeconds(b) >= config.minEntryMinutes * 60);
    const entries = [];
    let carryTicket = priorTicket;
    for (const meeting of clippedMeetings) {
        entries.push(toEntry("meeting", meeting.title, roundInterval(meeting.interval, config.roundToMinutes), config.tags));
    }
    for (const block of freeBlocks) {
        const fallback = assignTicket(block.start, dayEvents, carryTicket, config.ticketPattern);
        const rounded = roundInterval(block, config.roundToMinutes);
        const segments = splitBlockByCommits(rounded, dayEvents, fallback, config.ticketPattern);
        for (const segment of segments) {
            const { attribution, unassignedText } = applyContextSignal(segment.attribution, segment.interval, contextSignals);
            if (attribution) {
                entries.push(toEntry("ticket", attribution.description, segment.interval, config.tags));
                carryTicket = attribution;
            }
            else {
                entries.push(toEntry("unassigned", unassignedText, segment.interval, config.tags));
            }
        }
    }
    entries.sort((a, b) => a.startUtc.localeCompare(b.startUtc));
    const totalSeconds = entries.reduce((sum, e) => sum + e.durationSeconds, 0);
    return {
        plan: { date, weekday, entries, totalSeconds },
        carryTicket,
    };
}
//# sourceMappingURL=plan.js.map