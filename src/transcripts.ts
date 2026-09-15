import { readdirSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join } from "node:path";
import { DateTime } from "luxon";
import { sanitizeSignalText, type ContextSignal } from "./context.js";
import { DEFAULT_TICKET_PATTERN } from "./defaults.js";
import { extractTicket } from "./ticket.js";

const TRANSCRIPTS_ROOT = join(homedir(), ".claude", "projects");

interface RawRecord {
  type?: string;
  aiTitle?: string;
  timestamp?: string;
  cwd?: string;
  gitBranch?: string;
  isSidechain?: boolean;
  isMeta?: boolean;
}

const MESSAGE_TYPES = new Set(["user", "assistant"]);

// Real generic auto-titles seen in practice ("Yes please", "Try again now", "Model haiku") -
// carry no more information than no title at all, so a session with one of these is treated
// the same as a session with no title: dropped, rather than enriching a description with noise.
const LOW_INFORMATION_TITLE = /^(yes( please)?|ok(ay)?|sure|thanks|continue|try again( now)?|model (haiku|sonnet|opus).*)\.?$/i;

function isUsableTitle(title: string | undefined): title is string {
  if (!title) return false;
  const trimmed = title.trim();
  if (trimmed.length < 6) return false;
  if (trimmed.split(/\s+/).length < 2) return false;
  return !LOW_INFORMATION_TITLE.test(trimmed);
}

export interface ParseSessionFileOptions {
  /** YYYY-MM-DD, inclusive, in `zone` */
  sinceIso: string;
  /** YYYY-MM-DD, inclusive, in `zone` */
  untilIso: string;
  zone: string;
  /** Only keep records whose cwd basename is in this list; empty/undefined keeps everything. */
  repoBasenames?: string[];
  ticketPattern?: string;
}

/**
 * Parse one Claude Code session transcript (JSONL, one record per line) into context
 * signals: one per contiguous in-window stretch of records on the same git branch. Pure -
 * takes lines, not a path, so it's testable against a fixture with no filesystem.
 *
 * Two passes are required because a `type: "ai-title"` record carries the session's
 * model-generated title but no timestamp/cwd, while `user`/`assistant` records carry
 * timestamp/cwd/branch but no title - the title has to be resolved before it can be
 * attached to any signal. A session with no usable title yields no signals at all: an
 * auto-title is the only human-readable summary available here, and a missing or generic
 * one ("Yes please", "Try again now") isn't worth guessing from raw message text.
 */
export function parseSessionFile(lines: string[], options: ParseSessionFileOptions): ContextSignal[] {
  const { sinceIso, untilIso, zone, repoBasenames, ticketPattern = DEFAULT_TICKET_PATTERN } = options;

  let title: string | undefined;
  const records: { timestamp: DateTime; cwd: string; branch: string | null }[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    let record: RawRecord;
    try {
      record = JSON.parse(line);
    } catch {
      continue; // malformed line - skip, don't fail the whole file
    }

    if (record.type === "ai-title") {
      if (record.aiTitle) title = record.aiTitle; // last one in the file wins
      continue;
    }

    if (!record.type || !MESSAGE_TYPES.has(record.type)) continue;
    if (record.isSidechain || record.isMeta) continue;
    if (!record.timestamp || !record.cwd) continue;

    const timestamp = DateTime.fromISO(record.timestamp).setZone(zone);
    if (!timestamp.isValid) continue;

    records.push({ timestamp, cwd: record.cwd, branch: record.gitBranch || null });
  }

  if (!isUsableTitle(title)) return [];
  const text = sanitizeSignalText(title);

  const windowStart = DateTime.fromISO(sinceIso, { zone }).startOf("day");
  const windowEnd = DateTime.fromISO(untilIso, { zone }).endOf("day");
  const inWindow = records
    .filter((r) => r.timestamp.toMillis() >= windowStart.toMillis() && r.timestamp.toMillis() <= windowEnd.toMillis())
    .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());

  const signals: ContextSignal[] = [];
  let run: typeof inWindow = [];

  // A session's title is generated once for the whole session, but a session can touch
  // several branches/tickets - if the title itself names a ticket, and it disagrees with
  // this particular branch-run's ticket, the title is almost certainly describing a
  // *different* run in the same session, not this one. Better to emit no signal here than
  // one confidently naming the wrong work.
  const titleTicket = extractTicket(text, ticketPattern);

  const flushRun = () => {
    if (run.length === 0) return;
    const repo = basename(run[0].cwd);
    const branch = run[0].branch;
    const ticket = branch ? extractTicket(branch, ticketPattern) : null;
    const repoAllowed = !repoBasenames || repoBasenames.length === 0 || repoBasenames.includes(repo);
    const titleMatchesRun = !titleTicket || !ticket || titleTicket === ticket;
    if (repoAllowed && titleMatchesRun) {
      signals.push({ start: run[0].timestamp, end: run[run.length - 1].timestamp, repo, branch, ticket, text, source: "session" });
    }
    run = [];
  };

  for (const record of inWindow) {
    const last = run[run.length - 1];
    // Split on a cwd change too, not just branch - two repos on the same branch name
    // (e.g. both on "main") must never merge into one run tagged with only the first's name.
    if (last && (last.branch !== record.branch || last.cwd !== record.cwd)) flushRun();
    run.push(record);
  }
  flushRun();

  return signals;
}

/**
 * Read every local Claude Code session transcript that could plausibly fall in
 * `sinceIso`..`untilIso` for one of `repos`, across every project directory this machine
 * has under `~/.claude/projects/`. IO - shortlists files by mtime before parsing, since a
 * week's worth of transcripts across all projects can run tens of MB. Degrades to `[]` on
 * any missing/unreadable path rather than throwing: transcripts are optional context, and
 * a machine with none configured must plan exactly as it did before this feature existed.
 */
export function readSessions(
  repos: string[],
  sinceIso: string,
  untilIso: string,
  zone: string,
  ticketPattern: string = DEFAULT_TICKET_PATTERN,
  root: string = TRANSCRIPTS_ROOT,
): ContextSignal[] {
  const repoBasenames = repos.map((r) => basename(r));

  let projectDirs: string[];
  try {
    projectDirs = readdirSync(root, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => join(root, e.name));
  } catch {
    return [];
  }

  // A file whose last write predates the window by more than a day cannot contain an
  // in-window record - JSONL is append-only, so mtime tracks the session's last activity.
  const cutoffMillis = DateTime.fromISO(sinceIso, { zone }).minus({ days: 1 }).toMillis();

  const signals: ContextSignal[] = [];
  for (const dir of projectDirs) {
    let files: string[];
    try {
      files = readdirSync(dir).filter((f) => f.endsWith(".jsonl"));
    } catch {
      continue;
    }

    for (const file of files) {
      const path = join(dir, file);
      try {
        if (statSync(path).mtimeMs < cutoffMillis) continue;
        const raw = readFileSync(path, "utf8");
        signals.push(...parseSessionFile(raw.split("\n"), { sinceIso, untilIso, zone, repoBasenames, ticketPattern }));
      } catch {
        continue;
      }
    }
  }
  return signals;
}
