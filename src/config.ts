import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { z } from "zod";
import type { Config } from "./types.js";
import { DEFAULT_BASE_BRANCHES, DEFAULT_TICKET_PATTERN } from "./defaults.js";

export const weekdaySchema = z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
export const hhmmSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "expected HH:mm");

export const classBlockSchema = z.object({
  label: z.string().min(1),
  day: weekdaySchema,
  start: hhmmSchema,
  end: hhmmSchema,
});

export const workdaySchema = z.object({
  start: hhmmSchema,
  end: hhmmSchema,
  lunchMinutes: z.number().int().min(0).max(180),
  lunchAt: hhmmSchema,
  days: z.array(weekdaySchema).min(1),
});

function isCompilableRegex(pattern: string): boolean {
  try {
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
}

export const configSchema = z.object({
  timezone: z.string().min(1),
  projectName: z.string().min(1),
  workday: workdaySchema,
  classes: z.array(classBlockSchema).default(() => []),
  nonWorkTitlePatterns: z.array(z.string()).default(() => []),
  repos: z.array(z.string()).min(1),
  ticketPattern: z.string().default(DEFAULT_TICKET_PATTERN).refine(isCompilableRegex, "not a valid regular expression"),
  baseBranches: z.array(z.string().min(1)).default(() => [...DEFAULT_BASE_BRANCHES]),
  minEntryMinutes: z.number().int().min(1).default(15),
  roundToMinutes: z.number().int().min(1).default(15),
  tags: z.array(z.string()).default(() => ["auto-baseline"]),
  createdWith: z.string().default("toggl-mcp"),
});

export const DEFAULT_CONFIG_PATH = join(homedir(), ".config", "toggl-mcp", "config.json");

/** Parse+validate an already-loaded value against the config schema, without touching the filesystem. */
export function validateConfig(raw: unknown): { ok: true; config: Config } | { ok: false; issues: string[] } {
  const result = configSchema.safeParse(raw);
  if (!result.success) {
    return { ok: false, issues: result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`) };
  }
  return { ok: true, config: result.data };
}

/**
 * Read and JSON-parse the config file without schema validation, distinguishing "file missing"
 * (null) from "file present but not valid JSON" (throws) - `doctor` needs that distinction to
 * report the right one-line fix instead of a generic failure.
 */
export function loadRawConfig(path: string = DEFAULT_CONFIG_PATH): unknown | null {
  let raw: string;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`toggl-mcp: config at ${path} is not valid JSON. (${(err as Error).message})`);
  }
}

export function loadConfig(path: string = DEFAULT_CONFIG_PATH): Config {
  const parsed = loadRawConfig(path);
  if (parsed === null) {
    throw new Error(
      `toggl-mcp: could not read config at ${path}. Create it before using any tool that needs a schedule (run \`toggl-mcp init\`).`,
    );
  }

  const result = validateConfig(parsed);
  if (!result.ok) {
    throw new Error(`toggl-mcp: config at ${path} is invalid:\n${result.issues.join("\n")}`);
  }
  return result.config;
}

/** Write `config` to `path`, backing up whatever was there before. Never touches TOGGL_API_TOKEN. */
export function writeConfig(config: Config, path: string = DEFAULT_CONFIG_PATH): void {
  mkdirSync(dirname(path), { recursive: true });
  try {
    const existing = readFileSync(path, "utf8");
    writeFileSync(`${path}.bak`, existing);
  } catch {
    // nothing to back up
  }
  writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`);
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
