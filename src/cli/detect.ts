import { execFileSync } from "node:child_process";

/** Best-effort detections for wizard defaults. Never throw - a failed detection just means no suggestion. */

export function detectTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

export function isGitRepo(path: string): boolean {
  try {
    execFileSync("git", ["-C", path, "rev-parse", "--git-dir"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    return true;
  } catch {
    return false;
  }
}

/** Branch names touched most recently in `repo`, newest first. */
export function sampleBranches(repo: string, count = 20): string[] {
  try {
    const raw = execFileSync(
      "git",
      ["-C", repo, "for-each-ref", "--sort=-committerdate", "--format=%(refname:short)", "refs/heads"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    );
    return raw.split("\n").filter((l) => l.trim().length > 0).slice(0, count);
  } catch {
    return [];
  }
}

export function detectDefaultBranch(repo: string): string | null {
  try {
    const raw = execFileSync("git", ["-C", repo, "symbolic-ref", "--short", "refs/remotes/origin/HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return raw ? raw.replace(/^origin\//, "") : null;
  } catch {
    return null;
  }
}

/** How many of `branches` the given regex captures - used to preview a ticket pattern before committing to it. */
export function previewTicketMatches(pattern: string, branches: string[]): { branch: string; match: string | null }[] {
  let regex: RegExp;
  try {
    regex = new RegExp(pattern);
  } catch {
    return branches.map((branch) => ({ branch, match: null }));
  }
  return branches.map((branch) => {
    const m = branch.match(regex);
    return { branch, match: m ? (m[1] ?? m[0]).toUpperCase() : null };
  });
}
