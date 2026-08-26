import { DateTime } from "luxon";
import { planDay, type TicketAttribution } from "./plan.js";
import { eachDate } from "./time.js";
import type { CalendarEventInput, Config, ExistingTimeEntry, GitEvent, WeekPlan } from "./types.js";

export interface BuildWeekPlanParams {
  weekStart: string;
  weekEnd: string;
  config: Config;
  gitEvents: (GitEvent & { ticket: string })[];
  calendarEvents: CalendarEventInput[];
  existingEntries: ExistingTimeEntry[];
}

function localDateOf(isoUtc: string, zone: string): string {
  return DateTime.fromISO(isoUtc, { zone: "utc" }).setZone(zone).toISODate()!;
}

export function buildWeekPlan(params: BuildWeekPlanParams): WeekPlan {
  const { weekStart, weekEnd, config, gitEvents, calendarEvents, existingEntries } = params;
  const dates = eachDate(weekStart, weekEnd, config.timezone);

  let priorTicket: TicketAttribution | null = null;
  const days = dates.map((date) => {
    const entriesForDate = existingEntries.filter((e) => localDateOf(e.start, config.timezone) === date);
    const { plan, carryTicket } = planDay({
      date,
      config,
      gitEvents,
      calendarEvents,
      existingEntries: entriesForDate,
      priorTicket,
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
