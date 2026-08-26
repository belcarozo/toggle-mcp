import type { DateTime } from "luxon";

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export interface ClassBlock {
  label: string;
  day: Weekday;
  /** "HH:mm" in the configured timezone */
  start: string;
  /** "HH:mm" in the configured timezone */
  end: string;
}

export interface WorkdayConfig {
  /** "HH:mm" */
  start: string;
  /** "HH:mm" */
  end: string;
  lunchMinutes: number;
  /** "HH:mm" */
  lunchAt: string;
  days: Weekday[];
}

export interface Config {
  timezone: string;
  projectName: string;
  calendarIds: string[];
  workday: WorkdayConfig;
  classes: ClassBlock[];
  nonWorkTitlePatterns: string[];
  repos: string[];
  authorEmails: string[];
  minEntryMinutes: number;
  roundToMinutes: number;
  tags: string[];
  createdWith: string;
}

/** A calendar event as passed in by the caller (from the Google Calendar MCP). */
export interface CalendarEventInput {
  title: string;
  /** ISO 8601, any offset */
  start: string;
  /** ISO 8601, any offset */
  end: string;
}

/** A single git signal: something happened on this branch at this local time. */
export interface GitEvent {
  timestamp: DateTime;
  repo: string;
  branch: string;
  ticket: string | null;
  /** Best-effort human description: commit subject if available, else derived from the branch slug. */
  description: string | null;
  kind: "checkout" | "commit" | "commit-merge" | "commit-amend" | "pull" | "reset";
}

export interface ExistingTimeEntry {
  id: number;
  start: string;
  stop: string | null;
}

export type EntryKind = "ticket" | "meeting" | "unassigned";

export interface PlannedEntry {
  kind: EntryKind;
  description: string;
  /** ISO local (configured timezone) */
  startLocal: string;
  /** ISO local (configured timezone) */
  endLocal: string;
  /** RFC3339 UTC, e.g. 2026-08-24T13:00:00Z */
  startUtc: string;
  /** RFC3339 UTC */
  stopUtc: string;
  durationSeconds: number;
  tags: string[];
}

export type SkipReason = "not-a-workday" | "already-tracked";

export interface DayPlan {
  /** YYYY-MM-DD */
  date: string;
  weekday: Weekday;
  skip?: SkipReason;
  entries: PlannedEntry[];
  totalSeconds: number;
}

export interface WeekPlan {
  /** YYYY-MM-DD, Monday */
  weekStart: string;
  /** YYYY-MM-DD, last day included */
  weekEnd: string;
  days: DayPlan[];
  totalSeconds: number;
}
