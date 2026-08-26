import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { z } from "zod";
import type { Config } from "./types.js";

const weekdaySchema = z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
const hhmmSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "expected HH:mm");

const classBlockSchema = z.object({
  label: z.string().min(1),
  day: weekdaySchema,
  start: hhmmSchema,
  end: hhmmSchema,
});

const workdaySchema = z.object({
  start: hhmmSchema,
  end: hhmmSchema,
  lunchMinutes: z.number().int().min(0).max(180),
  lunchAt: hhmmSchema,
  days: z.array(weekdaySchema).min(1),
});

const configSchema = z.object({
  timezone: z.string().min(1),
  projectName: z.string().min(1),
  calendarIds: z.array(z.string()).min(1),
  workday: workdaySchema,
  classes: z.array(classBlockSchema).default([]),
  nonWorkTitlePatterns: z.array(z.string()).default([]),
  repos: z.array(z.string()).min(1),
  authorEmails: z.array(z.string()).min(1),
  minEntryMinutes: z.number().int().min(1).default(15),
  roundToMinutes: z.number().int().min(1).default(15),
  tags: z.array(z.string()).default(["auto-baseline"]),
  createdWith: z.string().default("toggl-mcp"),
});

export const DEFAULT_CONFIG_PATH = join(homedir(), ".config", "toggl-mcp", "config.json");

export function loadConfig(path: string = DEFAULT_CONFIG_PATH): Config {
  let raw: string;
  try {
    raw = readFileSync(path, "utf8");
  } catch (err) {
    throw new Error(
      `toggl-mcp: could not read config at ${path}. Create it before using any tool that needs a schedule. (${(err as Error).message})`,
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`toggl-mcp: config at ${path} is not valid JSON. (${(err as Error).message})`);
  }

  const result = configSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`toggl-mcp: config at ${path} is invalid:\n${result.error.message}`);
  }
  return result.data;
}

export function requireApiToken(): string {
  const token = process.env.TOGGL_API_TOKEN;
  if (!token) {
    throw new Error(
      "toggl-mcp: TOGGL_API_TOKEN is not set. Pass it via the MCP server's env config, never in config.json.",
    );
  }
  return token;
}
