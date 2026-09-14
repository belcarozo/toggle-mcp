import { execFileSync } from "node:child_process";
import { basename } from "node:path";
import { DateTime } from "luxon";
import type { GitEvent } from "./types.js";
import { DEFAULT_BASE_BRANCHES } from "./defaults.js";

// `git reflog --date=iso` lines look like:
//   <hash> HEAD@{2026-08-24 16:23:22 -0300}: checkout: moving from spike/FFT-1316-silent-push to main
//   <hash> HEAD@{2026-08-21 12:52:27 -0300}: commit: FFT-1316: ios works, missing testing
//   <hash> HEAD@{2026-08-18 16:01:29 -0300}: pull: Fast-forward
//   <hash> HEAD@{2026-06-23 11:38:00 -0300}: reset: moving to HEAD
// The reflog subject for a "commit:" entry is already the commit's full first
// line, so no separate `git log` call is needed to get a description.
const REFLOG_LINE = /^\S+ HEAD@\{([^}]+)\}: (.+)$/;
const CHECKOUT_SUBJECT = /^checkout: moving from (\S+) to (\S+)$/;

function parseSubject(subject: string): { kind: GitEvent["kind"]; description: string | null; toBranch?: string } | null {
  const checkout = subject.match(CHECKOUT_SUBJECT);
  if (checkout) return { kind: "checkout", description: null, toBranch: checkout[2] };
  if (subject.startsWith("commit (merge):")) {
    return { kind: "commit-merge", description: subject.slice("commit (merge):".length).trim() };
  }
  if (subject.startsWith("commit (amend):")) {
    return { kind: "commit-amend", description: subject.slice("commit (amend):".length).trim() };
  }
  if (subject.startsWith("commit:")) {
    return { kind: "commit", description: subject.slice("commit:".length).trim() };
  }
  if (subject.startsWith("pull")) return { kind: "pull", description: null };
  if (subject.startsWith("reset")) return { kind: "reset", description: null };
  return null;
}

/** A checkout target that isn't a real branch (SHA, detached HEAD, tag ref, etc). */
export function looksLikeBranch(ref: string, baseBranches: string[] = DEFAULT_BASE_BRANCHES): boolean {
  if (baseBranches.includes(ref)) return false;
  if (/^[0-9a-f]{7,40}$/i.test(ref)) return false;
  if (ref.startsWith("(")) return false;
  return true;
}

export interface ParseReflogOptions {
  sinceIso: string;
  untilIso: string;
  zone: string;
  repoName: string;
  baseBranches?: string[];
}

/**
 * Parse raw `git reflog --date=iso` output into events, attributing
 * commit/pull/reset entries to whatever branch the most recent checkout in
 * the queried window pointed at. Entries before the first checkout in-window
 * have no known branch and are dropped - there is no ticket to attribute
 * them to anyway. Pure - takes reflog text, not a repo path, so it's testable
 * against a fixture without a real git checkout.
 */
export function parseReflog(raw: string, options: ParseReflogOptions): GitEvent[] {
  const { sinceIso, untilIso, zone, repoName, baseBranches = DEFAULT_BASE_BRANCHES } = options;

  const lines = raw.split("\n").filter((l) => l.trim().length > 0);
  // reflog lists newest first; walk oldest-to-newest so "current branch" tracking is chronological.
  lines.reverse();

  const windowStart = DateTime.fromISO(sinceIso, { zone }).startOf("day");
  const windowEnd = DateTime.fromISO(untilIso, { zone }).endOf("day");
  const events: GitEvent[] = [];
  let currentBranch: string | null = null;

  for (const line of lines) {
    const match = line.match(REFLOG_LINE);
    if (!match) continue;
    const [, dateStr, subject] = match;
    const parsed = parseSubject(subject);
    if (!parsed) continue;

    if (parsed.kind === "checkout") {
      currentBranch = looksLikeBranch(parsed.toBranch!, baseBranches) ? parsed.toBranch! : null;
      continue; // the checkout itself isn't billable work, just a branch-context update
    }

    if (!currentBranch) continue; // no known branch to attribute this to

    // git's --date=iso offset has no colon ("-0300"), which is luxon's "ZZZ" token, not "ZZ" ("-03:00").
    const timestamp = DateTime.fromFormat(dateStr, "yyyy-MM-dd HH:mm:ss ZZZ");
    if (!timestamp.isValid) continue;
    if (timestamp < windowStart || timestamp > windowEnd) continue; // lookback was for branch context only

    events.push({
      timestamp,
      repo: repoName,
      branch: currentBranch,
      ticket: null, // filled in by ticket.ts
      description: parsed.description,
      kind: parsed.kind,
    });
  }

  return events;
}

/**
 * Read reflog events for `repo` between `sinceIso`/`untilIso` (YYYY-MM-DD,
 * inclusive). See `parseReflog` for the attribution logic.
 */
export function readReflogEvents(
  repo: string,
  sinceIso: string,
  untilIso: string,
  zone: string,
  baseBranches: string[] = DEFAULT_BASE_BRANCHES,
): GitEvent[] {
  // Fetch a wider window than requested so a checkout that happened *before*
  // `sinceIso` still establishes the branch context for commits at the start
  // of the requested range. Without this, a window that opens mid-branch
  // would drop every event in it for lack of a known "current branch".
  const lookbackStart = DateTime.fromISO(sinceIso, { zone }).minus({ days: 21 }).toISODate()!;

  let raw: string;
  try {
    raw = execFileSync(
      "git",
      ["-C", repo, "reflog", "--date=iso", `--since=${lookbackStart} 00:00:00`, `--until=${untilIso} 23:59:59`],
      { encoding: "utf8", maxBuffer: 1024 * 1024 * 16 },
    );
  } catch (err) {
    throw new Error(`toggl-mcp: failed to read git reflog for ${repo}: ${(err as Error).message}`);
  }

  return parseReflog(raw, { sinceIso, untilIso, zone, repoName: basename(repo), baseBranches });
}

export function readAllRepos(
  repos: string[],
  sinceIso: string,
  untilIso: string,
  zone: string,
  baseBranches: string[] = DEFAULT_BASE_BRANCHES,
): GitEvent[] {
  return repos.flatMap((repo) => readReflogEvents(repo, sinceIso, untilIso, zone, baseBranches));
}
