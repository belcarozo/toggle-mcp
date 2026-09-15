import { DateTime } from "luxon";
import { planDay } from "./plan.js";
import { eachDate } from "./time.js";
function localDateOf(isoUtc, zone) {
    return DateTime.fromISO(isoUtc, { zone: "utc" }).setZone(zone).toISODate();
}
export function buildWeekPlan(params) {
    const { weekStart, weekEnd, config, gitEvents, calendarEvents, existingEntries, contextSignals } = params;
    const dates = eachDate(weekStart, weekEnd, config.timezone);
    let priorTicket = null;
    const days = dates.map((date) => {
        const entriesForDate = existingEntries.filter((e) => localDateOf(e.start, config.timezone) === date);
        const { plan, carryTicket } = planDay({
            date,
            config,
            gitEvents,
            calendarEvents,
            existingEntries: entriesForDate,
            priorTicket,
            contextSignals,
        });
        priorTicket = carryTicket;
        return plan;
    });
    return {
        weekStart,
        weekEnd,
        days,
        totalSeconds: days.reduce((sum, d) => sum + d.totalSeconds, 0),
    };
}
//# sourceMappingURL=week.js.map