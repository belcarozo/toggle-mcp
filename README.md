# toggl-mcp

An MCP (Model Context Protocol) server that generates a rough weekly [Toggl](https://toggl.com/) time-tracking baseline from your git activity (branches and commits across a set of configured repos) and calendar events supplied by the MCP client (e.g. a Google Calendar MCP server), and can optionally write that baseline to Toggl. It's meant as a starting point to hand-correct afterward, not a source of truth: it infers which ticket/branch you were likely working on and when from git reflog history, lays that alongside your meetings, and proposes time entries for a week — skipping any day that already has entries in Toggl.

## Requirements

- Node.js 20+ (see `engines` in `package.json`)
- A Toggl account and an [API token](https://track.toggl.com/profile) (Profile settings → API Token)
- One or more local git repository checkouts to scan for activity

## Quick start

```bash
npm install -g github:belcarozo/toggle-mcp   # dist/ ships prebuilt in the repo, so no build step runs
toggl-mcp init                               # interactive wizard - creates ~/.config/toggl-mcp/config.json
toggl-mcp doctor                             # sanity-checks the config, repos, and ticket pattern
```

`init` walks you through every field below with sensible detected defaults (system timezone, `git`-repo
validation, a live picker of your real Toggl projects if `TOGGL_API_TOKEN` is already set in your shell) and
prints a ready-to-paste MCP client registration snippet when it's done. Re-running `init` against an
existing config pre-fills every prompt with the current value — press Enter through all of them to leave it
unchanged, or answer just the ones you want to change.

Working from a clone instead: `npm install && npm run build`, then run `node dist/index.js init`/`doctor` in
place of the `toggl-mcp` bin below.

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

The easiest way to produce a valid file is `toggl-mcp init` (see [Quick start](#quick-start)); this table
is the reference for what each field means and for hand-editing afterward.

| Field | Type | Description |
|---|---|---|
| `timezone` | string (IANA tz, e.g. `"America/New_York"`) | Timezone used to interpret workday/class times and to resolve week boundaries. |
| `projectName` | string | Name of the Toggl project that generated entries are logged against. Resolved to a project ID via `toggl_whoami` / at plan/apply time. |
| `workday` | object | Your normal working hours/days — see sub-fields below. |
| `workday.start` | string (`HH:mm`) | Workday start time, local to `timezone`. |
| `workday.end` | string (`HH:mm`) | Workday end time, local to `timezone`. |
| `workday.lunchMinutes` | integer (0-180) | Length of the lunch break to carve out of the workday. |
| `workday.lunchAt` | string (`HH:mm`) | Start time of the lunch break. |
| `workday.days` | weekday[] (min 1) | Days considered workdays (`"mon"`..`"sun"`). Other days are skipped when planning (`skip: "not-a-workday"`). |
| `classes` | array (default `[]`) | Generic recurring-commitment blocks to carve out of the baseline during workday hours — **not limited to literal school classes**: use this for any recurring appointment (a class, a recurring medical/therapy appointment, gym, pickup/drop-off, etc.) that should never be counted as work time. Each entry: `{ label, day, start, end }` (`day` and times use the same weekday/`HH:mm` formats as `workday`). |
| `nonWorkTitlePatterns` | string[] (default `[]`) | Regular expressions (as strings) matched against incoming calendar event titles; matching events are excluded from the baseline as non-work (e.g. `"\\bclass\\b"` to exclude a recurring calendar block titled "Spanish class"). |
| `repos` | string[] (min 1) | Local filesystem paths to git repositories to scan for activity. |
| `ticketPattern` | string (regex, default `"([A-Za-z]{2,4}-\\d+)"`) | Matched against branch names to extract a ticket ID. The default assumes Jira-style keys (`FFT-1326`); if your team uses a different shape (longer prefixes, numeric-only IDs, no hyphen), set your own pattern — `toggl-mcp init`/`doctor` preview how many of your real recent branches it matches. If the pattern has a capture group, group 1 is used as the ticket ID; otherwise the whole match is. |
| `baseBranches` | string[] (default `["main", "master", "develop"]`) | Checkout targets treated as base/integration branches, never as billable work. Add your trunk branch name here if it isn't one of the defaults. |
| `minEntryMinutes` | integer (min 1, default `15`) | Minimum duration for a generated time entry; shorter spans are dropped or merged. |
| `roundToMinutes` | integer (min 1, default `15`) | Duration/boundary rounding granularity applied to generated entries. |
| `tags` | string[] (default `["auto-baseline"]`) | Toggl tags applied to every entry this server creates. |
| `createdWith` | string (default `"toggl-mcp"`) | Value sent as Toggl's `created_with` field on created entries. |

### Minimal example config

```json
{
  "timezone": "America/New_York",
  "projectName": "Engineering",
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
  "ticketPattern": "([A-Za-z]{2,4}-\\d+)",
  "baseBranches": ["main", "master", "develop"],
  "minEntryMinutes": 15,
  "roundToMinutes": 15,
  "tags": ["auto-baseline"],
  "createdWith": "toggl-mcp"
}
```

Fields with defaults (`classes`, `nonWorkTitlePatterns`, `ticketPattern`, `baseBranches`, `minEntryMinutes`, `roundToMinutes`, `tags`, `createdWith`) may be omitted entirely.

## Calendar events

This server has **no calendar integration of its own**. `plan_week` accepts a `calendarEvents` array (each
`{ title, start, end }`, ISO 8601 datetimes) that the MCP client is expected to supply — typically by first
querying a separate calendar MCP server (e.g. a Google Calendar MCP) for whichever calendars you want
counted, then passing the resulting events straight into `plan_week`.

## Configuration CLI

- **`toggl-mcp init`** (`node dist/index.js init` from a clone) — interactive wizard; creates the config if
  none exists, or updates it in place (backing up the previous version to `config.json.bak`) if one does.
  Flags: `--config <path>` (a non-default location), `--print` (print the resulting JSON instead of
  writing it).
- **`toggl-mcp doctor`** — checks the config file, that each repo path is a real git repository, that
  `ticketPattern` actually matches recent branches in those repos (the most common silent-failure mode —
  a mismatched pattern produces an empty baseline with no error), that each repo's default branch is
  covered by `baseBranches`, and that `TOGGL_API_TOKEN` is set. Flags: `--config <path>`, `--online` (also
  verify live Toggl connectivity — costs API calls against the 30-requests/hour `/me` limit, so it's opt-in).
- Running the built entry point with **no arguments** starts the MCP stdio server, unchanged from before
  the CLI existed — existing MCP client registrations keep working with no changes.
- The CLI never prompts for or writes `TOGGL_API_TOKEN` — see [Registering as an MCP server](#registering-as-an-mcp-server).

## Known limitations

- The "generic placeholder commit message" heuristic (`fix`, `wip`, `tmp`, ...) used to prefer a branch-name
  description over an uninformative commit message is a fixed word list in `src/ticket.ts`, not
  configurable.
- `git_activity`/`plan_week` scan every commit reached by a checkout in the queried window — there's no
  per-author filtering, since `git reflog` on your own local checkout is inherently your own activity.

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

Key modules: `src/config.ts` (config loading/validation), `src/git.ts` (git reflog reading), `src/ticket.ts` (ticket ID extraction from branch names), `src/time.ts` (timezone-aware week/date resolution), `src/toggl.ts` (Toggl API client), `src/week.ts` (day/week plan construction), `src/plan.ts`, `src/types.ts`, `src/defaults.ts` (the today-preserving defaults for `ticketPattern`/`baseBranches`), and `src/cli/` (the `init`/`doctor` commands).
