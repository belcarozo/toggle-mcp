import { DateTime } from "luxon";
const WEEKDAY_TO_LUXON = {
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
    sun: 7,
};
export function weekdayOf(dt) {
    const entry = Object.entries(WEEKDAY_TO_LUXON).find(([, n]) => n === dt.weekday);
    if (!entry)
        throw new Error(`unreachable: luxon weekday ${dt.weekday}`);
    return entry[0];
}
/** Build a DateTime for `date` (YYYY-MM-DD) at local "HH:mm" `time`, in `zone`. */
export function atLocalTime(date, time, zone) {
    const dt = DateTime.fromFormat(`${date} ${time}`, "yyyy-MM-dd HH:mm", { zone });
    if (!dt.isValid) {
        throw new Error(`invalid date/time "${date} ${time}": ${dt.invalidReason} ${dt.invalidExplanation ?? ""}`);
    }
    return dt;
}
/** Merge overlapping/adjacent intervals, sorted ascending. Input order does not matter. */
export function mergeIntervals(intervals) {
    if (intervals.length === 0)
        return [];
    const sorted = [...intervals].sort((a, b) => a.start.toMillis() - b.start.toMillis());
    const merged = [sorted[0]];
    for (const current of sorted.slice(1)) {
        const last = merged[merged.length - 1];
        if (current.start.toMillis() <= last.end.toMillis()) {
            if (current.end.toMillis() > last.end.toMillis())
                last.end = current.end;
        }
        else {
            merged.push({ ...current });
        }
    }
    return merged;
}
/** Clip `interval` to fall within `window`. Returns null if there is no overlap. */
export function clipToWindow(interval, window) {
    const start = interval.start.toMillis() > window.start.toMillis() ? interval.start : window.start;
    const end = interval.end.toMillis() < window.end.toMillis() ? interval.end : window.end;
    if (start.toMillis() >= end.toMillis())
        return null;
    return { start, end };
}
/**
 * Remove `subtract` (already merged, any order) from `base`, returning the
 * remaining non-overlapping pieces of `base` in ascending order.
 */
export function subtractIntervals(base, subtract) {
    const clipped = mergeIntervals(subtract)
        .map((s) => clipToWindow(s, base))
        .filter((s) => s !== null)
        .sort((a, b) => a.start.toMillis() - b.start.toMillis());
    const remaining = [];
    let cursor = base.start;
    for (const block of clipped) {
        if (block.start.toMillis() > cursor.toMillis()) {
            remaining.push({ start: cursor, end: block.start });
        }
        if (block.end.toMillis() > cursor.toMillis())
            cursor = block.end;
    }
    if (cursor.toMillis() < base.end.toMillis()) {
        remaining.push({ start: cursor, end: base.end });
    }
    return remaining;
}
export function durationSeconds(interval) {
    return Math.round(interval.end.diff(interval.start, "seconds").seconds);
}
/** Round both ends of an interval outward-then-in to the nearest `minutes`, preserving a minimum span of one unit. */
export function roundInterval(interval, minutes) {
    const round = (dt) => {
        const epochMinutes = dt.toMillis() / 60000;
        return DateTime.fromMillis(Math.round(epochMinutes / minutes) * minutes * 60000, { zone: dt.zone });
    };
    const start = round(interval.start);
    let end = round(interval.end);
    if (end.toMillis() <= start.toMillis())
        end = start.plus({ minutes });
    return { start, end };
}
/**
 * Resolve "this"/"last" into a Mon-Fri range in `zone`, anchored on `now`.
 * "this" never extends past today - there is no baseline for days that haven't happened yet.
 */
export function resolveWeek(which, zone, now = DateTime.now().setZone(zone)) {
    const today = now.setZone(zone).startOf("day");
    const mondayThisWeek = today.minus({ days: today.weekday - 1 });
    if (which === "this") {
        return { weekStart: mondayThisWeek.toISODate(), weekEnd: today.toISODate() };
    }
    const mondayLastWeek = mondayThisWeek.minus({ weeks: 1 });
    const fridayLastWeek = mondayLastWeek.plus({ days: 4 });
    return { weekStart: mondayLastWeek.toISODate(), weekEnd: fridayLastWeek.toISODate() };
}
export function eachDate(weekStart, weekEnd, zone) {
    const dates = [];
    let cursor = DateTime.fromISO(weekStart, { zone }).startOf("day");
    const end = DateTime.fromISO(weekEnd, { zone }).startOf("day");
    while (cursor.toMillis() <= end.toMillis()) {
        dates.push(cursor.toISODate());
        cursor = cursor.plus({ days: 1 });
    }
    return dates;
}
/** RFC3339 UTC in the exact form Toggl expects: 2006-01-02T15:04:05Z */
export function toTogglUtc(dt) {
    return dt.toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
}
//# sourceMappingURL=time.js.map