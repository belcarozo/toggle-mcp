# toggl-mcp

An MCP (Model Context Protocol) server that generates a rough weekly [Toggl](https://toggl.com/) time-tracking baseline from your git activity (branches and commits across a set of configured repos) and calendar events supplied by the MCP client (e.g. a Google Calendar MCP server), and can optionally write that baseline to Toggl. It's meant as a starting point to hand-correct afterward, not a source of truth: it infers which ticket/branch you were likely working on and when from git reflog history, lays that alongside your meetings, and proposes time entries for a week — skipping any day that already has entries in Toggl.

## Requirements

- Node.js 18+ (the project targets ES2022 with NodeNext ESM modules; no `engines` field is enforced in `package.json`)
- A Toggl account and an [API token](https://track.toggl.com/profile) (Profile settings → API Token)
- One or more local git repository checkouts to scan for activity

## Installation

```bash
npm install
npm run build   # compiles src/ (TypeScript) to dist/
npm test        # runs the vitest suite
```

`npm run build` emits `dist/index.js`, which is the server's entry point (declared as the `toggl-mcp` bin in `package.json`). During development you can run the server directly from source with `npm run dev` (uses `tsx`, no build step needed).

## Registering as an MCP server

`toggl-mcp` speaks MCP over stdio. Point your MCP client at the built entry point and provide your Toggl API token via the `TOGGL_API_TOKEN` environment variable — **never** put the token in `config.json`; it is only read from the environment (see `requireApiToken()` in `src/config.ts`).

Example client configuration (the exact file/format depends on your MCP client):

```json
{
  "mcpServers": {
    "toggl-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/toggl-mcp/dist/index.js"],
      "env": {
        "TOGGL_API_TOKEN": "your-toggl-api-token"
      }
    }
  }
}
```

## Configuration

The server reads a config file from `~/.config/toggl-mcp/config.json` by default (the path is `DEFAULT_CONFIG_PATH` in `src/config.ts`; `loadConfig()` accepts an override path if you're calling into the module directly). The file is validated with a zod schema on every load. The Toggl API token is deliberately **not** part of this file — see [Registering as an MCP server](#registering-as-an-mcp-server).

| Field | Type | Description |
|---|---|---|
| `timezone` | string (IANA tz, e.g. `"America/New_York"`) | Timezone used to interpret workday/class times and to resolve week boundaries. |
| `projectName` | string | Name of the Toggl project that generated entries are logged against. Resolved to a project ID via `toggl_whoami` / at plan/apply time. |
| `calendarIds` | string[] (min 1) | Calendar IDs whose events the caller should supply to `plan_week`. This server has no calendar integration of its own — see [Calendar events](#calendar-events) below. |
| `workday` | object | Your normal working hours/days — see sub-fields below. |
| `workday.start` | string (`HH:mm`) | Workday start time, local to `timezone`. |
| `workday.end` | string (`HH:mm`) | Workday end time, local to `timezone`. |
| `workday.lunchMinutes` | integer (0-180) | Length of the lunch break to carve out of the workday. |
| `workday.lunchAt` | string (`HH:mm`) | Start time of the lunch break. |
| `workday.days` | weekday[] (min 1) | Days considered workdays (`"mon"`..`"sun"`). Other days are skipped when planning (`skip: "not-a-workday"`). |
| `classes` | array (default `[]`) | Generic recurring-commitment blocks to carve out of the baseline during workday hours — **not limited to literal school classes**: use this for any recurring appointment (a class, a recurring medical/therapy appointment, gym, pickup/drop-off, etc.) that should never be counted as work time. Each entry: `{ label, day, start, end }` (`day` and times use the same weekday/`HH:mm` formats as `workday`). |
| `nonWorkTitlePatterns` | string[] (default `[]`) | Regular expressions (as strings) matched against incoming calendar event titles; matching events are excluded from the baseline as non-work (e.g. `"\\bclass\\b"` to exclude a recurring calendar block titled "Spanish class"). |
| `repos` | string[] (min 1) | Local filesystem paths to git repositories to scan for activity. |
| `authorEmails` | string[] (min 1) | Git author emails counted as "yours" when scanning commits/branches in `repos`. |
| `minEntryMinutes` | integer (min 1, default `15`) | Minimum duration for a generated time entry; shorter spans are dropped or merged. |
| `roundToMinutes` | integer (min 1, default `15`) | Duration/boundary rounding granularity applied to generated entries. |
| `tags` | string[] (default `["auto-baseline"]`) | Toggl tags applied to every entry this server creates. |
| `createdWith` | string (default `"toggl-mcp"`) | Value sent as Toggl's `created_with` field on created entries. |

### Minimal example config

```json
{
  "timezone": "America/New_York",
  "projectName": "Engineering",
  "calendarIds": ["primary"],
  "workday": {
    "start": "09:00",
    "end": "17:30",
    "lunchMinutes": 30,
    "lunchAt": "12:30",
    "days": ["mon", "tue", "wed", "thu", "fri"]
  },
  "classes": [
    { "label": "Gym", "day": "wed", "start": "07:00", "end": "08:00" }
  ],
  "nonWorkTitlePatterns": ["\\bclass\\b", "\\bappointment\\b"],
  "repos": ["/Users/you/projects/your-repo"],
  "authorEmails": ["you@example.com"],
  "minEntryMinutes": 15,
  "roundToMinutes": 15,
  "tags": ["auto-baseline"],
  "createdWith": "toggl-mcp"
}
```

Fields with defaults (`classes`, `nonWorkTitlePatterns`, `minEntryMinutes`, `roundToMinutes`, `tags`, `createdWith`) may be omitted entirely.

## Calendar events

This server has **no calendar integration of its own**. `plan_week` accepts a `calendarEvents` array (each `{ title, start, end }`, ISO 8601 datetimes) that the MCP client is expected to supply — typically by first querying a separate calendar MCP server (e.g. a Google Calendar MCP) for the calendars listed in `calendarIds`, then passing the resulting events straight into `plan_week`.

## MCP tools

### `toggl_whoami`
Resolves your Toggl account, default workspace, and the `projectName` from config to their numeric IDs. Results are cached on disk for 24 hours because Toggl's `/me` endpoint is rate-limited to 30 requests/hour. Pass `forceRefresh: true` to bypass the cache.

### `git_activity`
Debug tool — makes no network calls. Shows the raw git reflog events (checkouts, commits, merges, amends, pulls, resets) across the configured `repos` for a date range, along with the ticket ID and description resolved from each branch/commit. Use this to sanity-check ticket attribution before trusting `plan_week`'s output.

### `plan_week`
Builds a baseline time-entry proposal for a week from git activity plus the `calendarEvents` you supply. Writes nothing to Toggl. Days that already have existing Toggl entries are skipped (`skip: "already-tracked"`), as are non-workdays (`skip: "not-a-workday"`). Returns a `weekPlan` object (along with the resolved `workspaceId`/`projectId`) intended to be passed straight through to `apply_week`.

### `apply_week`
Writes the exact `weekPlan` (plus `workspaceId`/`projectId`) returned by `plan_week` to Toggl. Immediately before writing each day, it re-checks Toggl for existing entries on that date — in case something was tracked between the `plan_week` call and now — and skips the day if so. Days already marked `skip` in the input are never written.

Both `plan_week` and `apply_week` accept a week selector: either `week: "this"` (Monday through today) / `week: "last"` (previous Monday-Friday), or an explicit `startDate`/`endDate` pair (`YYYY-MM-DD`).

## Typical workflow

1. **`git_activity`** for the week in question — sanity-check that ticket/branch attribution from git reflog looks right before trusting anything downstream.
2. **`plan_week`** with calendar events for the same range — review the proposed `weekPlan` (which days/entries it produced, what it skipped and why).
3. **`apply_week`** with the exact `weekPlan` from step 2 — writes the entries to Toggl, re-verifying each day is still untracked immediately before writing it.

## Development

Source lives in `src/`, tests are colocated as `*.test.ts` files and run with [vitest](https://vitest.dev/):

```bash
npm test         # single run
npm run test:watch
```

Key modules: `src/config.ts` (config loading/validation), `src/git.ts` (git reflog reading), `src/ticket.ts` (ticket ID extraction from branch names), `src/time.ts` (timezone-aware week/date resolution), `src/toggl.ts` (Toggl API client), `src/week.ts` (day/week plan construction), `src/plan.ts`, `src/types.ts`.
