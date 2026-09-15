import { homedir } from "node:os";
import { join } from "node:path";
import { DateTime } from "luxon";
import { hhmmSchema, weekdaySchema } from "../config.js";
import { DEFAULT_BASE_BRANCHES, DEFAULT_TICKET_PATTERN } from "../defaults.js";
import { WEEKDAYS } from "../types.js";
/** A fresh config with every schema default filled in and every required field left blank/empty. */
export const STARTER_CONFIG = {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    projectName: "",
    workday: { start: "09:00", end: "17:30", lunchMinutes: 30, lunchAt: "12:30", days: ["mon", "tue", "wed", "thu", "fri"] },
    classes: [],
    nonWorkTitlePatterns: [],
    repos: [],
    ticketPattern: DEFAULT_TICKET_PATTERN,
    baseBranches: [...DEFAULT_BASE_BRANCHES],
    minEntryMinutes: 15,
    roundToMinutes: 15,
    tags: [],
    createdWith: "toggl-mcp",
};
function expandHome(path) {
    return path.startsWith("~") ? join(homedir(), path.slice(1)) : path;
}
function requireNonEmpty(raw, message) {
    const trimmed = raw.trim();
    if (trimmed === "")
        throw new Error(message);
    return trimmed;
}
function requireHHMM(raw) {
    const result = hhmmSchema.safeParse(raw.trim());
    if (!result.success)
        throw new Error(`toggl-mcp: expected HH:mm, got "${raw}"`);
    return result.data;
}
function requireTimezone(raw) {
    const trimmed = raw.trim();
    if (!DateTime.now().setZone(trimmed).isValid) {
        throw new Error(`toggl-mcp: "${trimmed}" is not a recognized IANA timezone (e.g. "America/New_York")`);
    }
    return trimmed;
}
function requireCompilableRegex(raw) {
    const trimmed = raw.trim();
    try {
        new RegExp(trimmed);
    }
    catch (err) {
        throw new Error(`toggl-mcp: "${trimmed}" is not a valid regular expression (${err.message})`);
    }
    return trimmed;
}
function requireInt(raw, min, max) {
    const n = Number(raw.trim());
    if (!Number.isInteger(n) || n < min || (max !== undefined && n > max)) {
        throw new Error(`toggl-mcp: expected an integer${max !== undefined ? ` between ${min} and ${max}` : ` >= ${min}`}, got "${raw}"`);
    }
    return n;
}
/** The separator between list items in a single-line answer. Not "," - regex strings (nonWorkTitlePatterns,
 * ticketPattern-adjacent values) routinely contain commas in quantifiers like "{2,4}", which would silently
 * split one logical item into two on re-parse. ";" is far less likely to appear inside any list value. */
const LIST_DELIMITER = ";";
/**
 * Semicolon-separated list. Both an empty string and "-" mean "empty list" - "-" lets a user explicitly
 * clear a non-empty default. Throws (rather than silently corrupting) if a value itself contains the
 * delimiter, since that value could never round-trip through format+parse intact.
 */
export function formatList(values) {
    for (const v of values) {
        if (v.includes(LIST_DELIMITER)) {
            throw new Error(`toggl-mcp: can't show or edit this value in the CLI because it contains "${LIST_DELIMITER}" ("${v}") - edit config.json by hand for this field.`);
        }
    }
    return values.join(`${LIST_DELIMITER} `);
}
export function parseList(raw) {
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed === "-")
        return [];
    return trimmed
        .split(LIST_DELIMITER)
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
}
export function parseRepoList(raw) {
    return parseList(raw).map(expandHome);
}
export function parseWeekdays(raw) {
    return parseList(raw).map((v) => {
        const result = weekdaySchema.safeParse(v.toLowerCase());
        if (!result.success)
            throw new Error(`toggl-mcp: "${v}" is not a weekday (mon..sun)`);
        return result.data;
    });
}
/**
 * Each recurring block as "Label@day@HH:mm@HH:mm", joined by "; ". Throws (rather than silently
 * producing an entry that can't be parsed back) if a label itself contains "@" or ";" - either would
 * make the entry ambiguous to re-split.
 */
export function formatClasses(classes) {
    for (const c of classes) {
        const badChar = c.label.includes("@") ? "@" : c.label.includes(";") ? ";" : null;
        if (badChar) {
            throw new Error(`toggl-mcp: can't show or edit the recurring-commitment label "${c.label}" in the CLI because it contains "${badChar}" - edit config.json by hand for this field.`);
        }
    }
    return classes.map((c) => `${c.label}@${c.day}@${c.start}@${c.end}`).join("; ");
}
export function parseClasses(raw) {
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed === "-")
        return [];
    const dayPattern = WEEKDAYS.join("|");
    const linePattern = new RegExp(`^(.+)@(${dayPattern})@([0-2]\\d:[0-5]\\d)@([0-2]\\d:[0-5]\\d)$`, "i");
    return trimmed
        .split(";")
        .map((v) => v.trim())
        .filter((v) => v.length > 0)
        .map((entry) => {
        const match = entry.match(linePattern);
        if (!match) {
            throw new Error(`toggl-mcp: invalid recurring-commitment entry "${entry}" - expected "Label@day@HH:mm@HH:mm"`);
        }
        const [, label, day, start, end] = match;
        return { label: label.trim(), day: day.toLowerCase(), start, end };
    });
}
export function buildFieldSpecs() {
    return [
        {
            id: "timezone",
            prompt: "Timezone (IANA, e.g. America/New_York)",
            get: (c) => c.timezone,
            format: (v) => v,
            parse: requireTimezone,
            set: (d, v) => (d.timezone = v),
        },
        {
            id: "repos",
            prompt: "Git repos to scan (absolute paths, semicolon-separated)",
            get: (c) => c.repos,
            format: (v) => formatList(v),
            parse: (raw) => {
                const repos = parseRepoList(raw);
                if (repos.length === 0)
                    throw new Error("toggl-mcp: at least one repo path is required");
                return repos;
            },
            set: (d, v) => (d.repos = v),
        },
        {
            id: "ticketPattern",
            prompt: "Ticket-ID pattern (regex matched against branch names)",
            get: (c) => c.ticketPattern,
            format: (v) => v,
            parse: requireCompilableRegex,
            set: (d, v) => (d.ticketPattern = v),
        },
        {
            id: "baseBranches",
            prompt: "Base/integration branches, semicolon-separated (never billable work)",
            get: (c) => c.baseBranches,
            format: (v) => formatList(v),
            parse: parseList,
            set: (d, v) => (d.baseBranches = v),
        },
        {
            id: "projectName",
            prompt: "Toggl project name to log against",
            get: (c) => c.projectName,
            format: (v) => v,
            parse: (raw) => requireNonEmpty(raw, "toggl-mcp: a Toggl project name is required"),
            set: (d, v) => (d.projectName = v),
        },
        {
            id: "workday.start",
            prompt: "Workday start (HH:mm)",
            get: (c) => c.workday.start,
            format: (v) => v,
            parse: requireHHMM,
            set: (d, v) => (d.workday.start = v),
        },
        {
            id: "workday.end",
            prompt: "Workday end (HH:mm)",
            get: (c) => c.workday.end,
            format: (v) => v,
            parse: requireHHMM,
            set: (d, v) => (d.workday.end = v),
        },
        {
            id: "workday.lunchAt",
            prompt: "Lunch start (HH:mm)",
            get: (c) => c.workday.lunchAt,
            format: (v) => v,
            parse: requireHHMM,
            set: (d, v) => (d.workday.lunchAt = v),
        },
        {
            id: "workday.lunchMinutes",
            prompt: "Lunch length (minutes)",
            get: (c) => c.workday.lunchMinutes,
            format: (v) => String(v),
            parse: (raw) => requireInt(raw, 0, 180),
            set: (d, v) => (d.workday.lunchMinutes = v),
        },
        {
            id: "workday.days",
            prompt: "Workdays (mon;tue;wed;thu;fri;sat;sun)",
            get: (c) => c.workday.days,
            format: (v) => formatList(v),
            parse: (raw) => {
                const days = parseWeekdays(raw);
                if (days.length === 0)
                    throw new Error("toggl-mcp: at least one workday is required");
                return days;
            },
            set: (d, v) => (d.workday.days = v),
        },
        {
            id: "classes",
            prompt: 'Recurring non-work commitments ("Label@day@HH:mm@HH:mm; ..." or "-" for none)',
            get: (c) => c.classes,
            format: (v) => formatClasses(v),
            parse: parseClasses,
            set: (d, v) => (d.classes = v),
        },
        {
            id: "nonWorkTitlePatterns",
            prompt: 'Calendar-title regexes to exclude as non-work (semicolon-separated, or "-" for none)',
            get: (c) => c.nonWorkTitlePatterns,
            format: (v) => formatList(v),
            parse: parseList,
            set: (d, v) => (d.nonWorkTitlePatterns = v),
        },
        {
            id: "minEntryMinutes",
            prompt: "Minimum entry length (minutes)",
            get: (c) => c.minEntryMinutes,
            format: (v) => String(v),
            parse: (raw) => requireInt(raw, 1),
            set: (d, v) => (d.minEntryMinutes = v),
        },
        {
            id: "roundToMinutes",
            prompt: "Round entries to the nearest (minutes)",
            get: (c) => c.roundToMinutes,
            format: (v) => String(v),
            parse: (raw) => requireInt(raw, 1),
            set: (d, v) => (d.roundToMinutes = v),
        },
        {
            id: "tags",
            prompt: 'Tags applied to created entries (semicolon-separated, or "-" for none)',
            get: (c) => c.tags,
            format: (v) => formatList(v),
            parse: parseList,
            set: (d, v) => (d.tags = v),
        },
        {
            id: "createdWith",
            prompt: "Toggl created_with value",
            get: (c) => c.createdWith,
            format: (v) => v,
            parse: (raw) => requireNonEmpty(raw, "toggl-mcp: created_with cannot be empty"),
            set: (d, v) => (d.createdWith = v),
        },
    ];
}
/** What to show in brackets as the current/default value for a field, given the base config. */
export function defaultAnswer(spec, base) {
    return spec.format(spec.get(base));
}
/**
 * Build a full config draft from `base` plus whatever the user typed (keyed by field id).
 * An absent or blank answer falls back to `base`'s own value for that field, formatted then
 * re-parsed - so answering nothing for every field reproduces `base` exactly (the round-trip
 * guarantee `init` relies on when re-run against an existing config).
 */
export function answersToConfig(base, answers) {
    const draft = structuredClone(base);
    for (const spec of buildFieldSpecs()) {
        const raw = answers[spec.id];
        const effectiveRaw = raw !== undefined && raw.trim() !== "" ? raw : defaultAnswer(spec, base);
        spec.set(draft, spec.parse(effectiveRaw));
    }
    return draft;
}
//# sourceMappingURL=questions.js.map