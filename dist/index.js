#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import { signalsFromNotes } from "./context.js";
import { DEFAULT_CONFIG_PATH, loadConfig, requireApiToken } from "./config.js";
import { readAllRepos } from "./git.js";
import { resolveWeek } from "./time.js";
import { readSessions } from "./transcripts.js";
import { TogglClient } from "./toggl.js";
import { withTickets } from "./ticket.js";
import { buildWeekPlan } from "./week.js";
function contextSignalsResult(signals) {
    return signals.map((s) => ({
        start: s.start.toISO(),
        end: s.end.toISO(),
        repo: s.repo,
        branch: s.branch,
        ticket: s.ticket,
        text: s.text,
        source: s.source,
    }));
}
const WEEKDAY_ENUM = z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
const plannedEntrySchema = z.object({
    kind: z.enum(["ticket", "meeting", "unassigned"]),
    description: z.string(),
    startLocal: z.string(),
    endLocal: z.string(),
    startUtc: z.string(),
    stopUtc: z.string(),
    durationSeconds: z.number(),
    tags: z.array(z.string()),
});
const dayPlanSchema = z.object({
    date: z.string(),
    weekday: WEEKDAY_ENUM,
    skip: z.enum(["not-a-workday", "already-tracked"]).optional(),
    entries: z.array(plannedEntrySchema),
    totalSeconds: z.number(),
});
const weekPlanSchema = z.object({
    weekStart: z.string(),
    weekEnd: z.string(),
    days: z.array(dayPlanSchema),
    totalSeconds: z.number(),
});
const weekSelectionSchema = z
    .object({
    week: z.enum(["this", "last"]).optional().describe('"this" = Monday through today; "last" = previous Mon-Fri'),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe("YYYY-MM-DD, used with endDate instead of week"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})
    .refine((v) => v.week !== undefined || (v.startDate !== undefined && v.endDate !== undefined), {
    message: "provide either `week` or both `startDate` and `endDate`",
});
const calendarEventSchema = z.object({
    title: z.string(),
    start: z.string().describe("ISO 8601 datetime, any offset"),
    end: z.string().describe("ISO 8601 datetime, any offset"),
});
const contextNoteSchema = z.object({
    text: z.string().describe("e.g. a Slack thread excerpt naming what was being worked on"),
    start: z.string().describe("ISO 8601 datetime, any offset"),
    end: z.string().describe("ISO 8601 datetime, any offset"),
    source: z.enum(["session", "slack"]).optional(),
});
function resolveRange(config, input) {
    if (input.week)
        return resolveWeek(input.week, config.timezone);
    return { weekStart: input.startDate, weekEnd: input.endDate };
}
function textResult(data) {
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
}
function errorResult(err) {
    return {
        content: [{ type: "text", text: `Error: ${err instanceof Error ? err.message : String(err)}` }],
        isError: true,
    };
}
const server = new McpServer({ name: "toggl-mcp", version: "0.1.0" });
server.registerTool("toggl_whoami", {
    title: "Toggl whoami",
    description: `Resolve the Toggl account, default workspace, and the "${DEFAULT_CONFIG_PATH}" project name to their IDs. ` +
        "Cached 24h on disk since /me is rate-limited to 30 requests/hour. Use forceRefresh to bypass the cache.",
    inputSchema: z.object({ forceRefresh: z.boolean().optional().default(false) }),
}, async ({ forceRefresh }) => {
    try {
        const config = loadConfig();
        const client = new TogglClient(requireApiToken());
        const me = await client.me(forceRefresh);
        const projectId = await client.findProjectId(me.default_workspace_id, config.projectName, forceRefresh);
        return textResult({ userId: me.id, email: me.email, workspaceId: me.default_workspace_id, projectId, projectName: config.projectName });
    }
    catch (err) {
        return errorResult(err);
    }
});
server.registerTool("git_activity", {
    title: "Git activity (debug, no network)",
    description: "Show raw git reflog events and their resolved ticket/description per day for the given range, " +
        "plus context signals resolved from local Claude Code session transcripts for the same range. " +
        "No Toggl or calendar calls - use this to sanity-check attribution before running plan_week.",
    inputSchema: weekSelectionSchema,
}, async (input) => {
    try {
        const config = loadConfig();
        const { weekStart, weekEnd } = resolveRange(config, input);
        const events = withTickets(readAllRepos(config.repos, weekStart, weekEnd, config.timezone, config.baseBranches), config.ticketPattern).sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
        const contextSignals = readSessions(config.repos, weekStart, weekEnd, config.timezone, config.ticketPattern);
        return textResult({
            weekStart,
            weekEnd,
            events: events.map((e) => ({
                date: e.timestamp.toISODate(),
                time: e.timestamp.toFormat("HH:mm"),
                repo: e.repo,
                branch: e.branch,
                ticket: e.ticket,
                kind: e.kind,
                description: e.description,
            })),
            contextSignals: contextSignalsResult(contextSignals),
        });
    }
    catch (err) {
        return errorResult(err);
    }
});
server.registerTool("plan_week", {
    title: "Plan a week's Toggl baseline",
    description: "Build a baseline time-entry proposal for a week from git activity and calendar events. Writes nothing to Toggl. " +
        "Calendar events must be supplied by the caller (e.g. from the Google Calendar MCP) for the calendars this user wants counted. " +
        "Local Claude Code session transcripts are read automatically and, plus any caller-supplied contextNotes (e.g. Slack " +
        "thread excerpts), are used to name entries where git signal is weak (a branch-slug fallback) or absent (unassigned) - " +
        "never to override an entry that already has a real commit message. " +
        "Days that already have Toggl entries are skipped. Each commit ends its own entry, so a busy day can produce many " +
        "short entries rather than one. Pass the returned object straight to apply_week to write it.",
    // A flat object, not weekSelectionSchema.and(...): zod's intersection
    // compiles to a JSON Schema `allOf`, which several tool-schema consumers
    // (this one's deferred-tool indexing included) silently drop rather than
    // flatten - the tool would list over raw MCP but never actually resolve.
    inputSchema: z
        .object({
        week: z.enum(["this", "last"]).optional().describe('"this" = Monday through today; "last" = previous Mon-Fri'),
        startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe("YYYY-MM-DD, used with endDate instead of week"),
        endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        calendarEvents: z.array(calendarEventSchema).default([]),
        contextNotes: z.array(contextNoteSchema).default([]),
    })
        .refine((v) => v.week !== undefined || (v.startDate !== undefined && v.endDate !== undefined), {
        message: "provide either `week` or both `startDate` and `endDate`",
    }),
}, async (input) => {
    try {
        const config = loadConfig();
        const { weekStart, weekEnd } = resolveRange(config, input);
        const client = new TogglClient(requireApiToken());
        const me = await client.me();
        const projectId = await client.findProjectId(me.default_workspace_id, config.projectName);
        const gitEvents = withTickets(readAllRepos(config.repos, weekStart, weekEnd, config.timezone, config.baseBranches), config.ticketPattern);
        const existingEntries = await client.listTimeEntries(weekStart, weekEnd);
        const contextSignals = [
            ...readSessions(config.repos, weekStart, weekEnd, config.timezone, config.ticketPattern),
            ...signalsFromNotes(input.contextNotes, config.ticketPattern),
        ];
        const weekPlan = buildWeekPlan({
            weekStart,
            weekEnd,
            config,
            gitEvents,
            calendarEvents: input.calendarEvents,
            existingEntries,
            contextSignals,
        });
        return textResult({ workspaceId: me.default_workspace_id, projectId, weekPlan });
    }
    catch (err) {
        return errorResult(err);
    }
});
server.registerTool("apply_week", {
    title: "Apply a planned week to Toggl",
    description: "Write the exact proposal returned by plan_week to Toggl. Re-checks each day for existing entries immediately " +
        "before writing (in case something was tracked between plan_week and this call) and skips it if so. " +
        "Days marked `skip` in the input are never written. Writes one entry at a time, throttled to Toggl's rate limit, " +
        "so a plan with many entries (a commit-heavy week) can take well over a minute.",
    inputSchema: z.object({
        workspaceId: z.number(),
        projectId: z.number(),
        weekPlan: weekPlanSchema,
    }),
}, async ({ workspaceId, projectId, weekPlan }) => {
    try {
        const config = loadConfig();
        const client = new TogglClient(requireApiToken());
        const results = [];
        for (const day of weekPlan.days) {
            if (day.skip) {
                results.push({ date: day.date, skipped: day.skip });
                continue;
            }
            // Re-check right before writing THIS day, not once for the whole week up
            // front - the write loop below is throttled and can span well over a
            // minute, long enough for something to get tracked on a later day in
            // between the upfront check and that day's turn.
            const stillUntracked = (await client.listTimeEntries(day.date, day.date)).length === 0;
            if (!stillUntracked) {
                results.push({ date: day.date, skipped: "already-tracked-at-apply-time" });
                continue;
            }
            const createdIds = [];
            for (const entry of day.entries) {
                const created = await client.createTimeEntry(workspaceId, {
                    description: entry.description,
                    start: entry.startUtc,
                    stop: entry.stopUtc,
                    duration: entry.durationSeconds,
                    project_id: projectId,
                    tags: entry.tags,
                    created_with: config.createdWith,
                });
                createdIds.push(created.id);
            }
            results.push({ date: day.date, createdIds });
        }
        return textResult({ results });
    }
    catch (err) {
        return errorResult(err);
    }
});
async function main() {
    const argv = process.argv.slice(2);
    if (argv.length === 0) {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        return;
    }
    // Dynamic import: keeps readline (and its stdin usage) out of the server's
    // cold start, since the two modes must never share a process.
    const { runCli } = await import("./cli/main.js");
    process.exitCode = await runCli(argv);
}
main().catch((err) => {
    console.error("toggl-mcp: fatal error", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map