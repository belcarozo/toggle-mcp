import type { GitEvent } from "./types.js";

const TICKET_PATTERN = /([A-Za-z]{2,4}-\d+)/;

/** Pull a ticket ID (e.g. "FFT-1326") out of a branch name, if present. */
export function extractTicket(branch: string): string | null {
  const match = branch.match(TICKET_PATTERN);
  return match ? match[1].toUpperCase() : null;
}

/**
 * Build a human description from a branch name when there's no commit
 * message to use: strip the type/ prefix and the ticket itself, de-kebab
 * what's left. "fix/FFT-1326-android-image" -> "FFT-1326: android image".
 */
export function describeFromBranch(branch: string, ticket: string): string {
  const idx = branch.search(new RegExp(ticket, "i"));
  let rest = idx >= 0 ? branch.slice(idx + ticket.length) : branch;
  rest = rest
    .replace(/^[-/_]+/, "")
    .replace(/[-_/]+/g, " ")
    .trim();
  return rest ? `${ticket}: ${rest}` : ticket;
}

export interface TicketAttribution {
  ticket: string;
  description: string;
}

/**
 * Resolve the best available description for a ticket from a set of git
 * events attributed to it, most recent first: a real commit message wins
 * over the branch-name fallback, since it's the more informative of the two.
 */
export function bestDescriptionFor(ticket: string, events: GitEvent[]): string {
  const sorted = [...events].sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
  const withCommitMessage = sorted.find(
    (e) => (e.kind === "commit" || e.kind === "commit-merge" || e.kind === "commit-amend") && e.description,
  );
  const raw = withCommitMessage?.description ?? describeFromBranch(sorted[0].branch, ticket);
  // Guarantee the ticket is visible even if the winning commit message didn't
  // happen to start with it (e.g. a generic "Merged main into X" message).
  return new RegExp(`^${ticket}\\b`, "i").test(raw) ? raw : `${ticket}: ${raw}`;
}

/** Attach `ticket` to every event whose branch resolves to one, dropping the rest. */
export function withTickets(events: GitEvent[]): (GitEvent & { ticket: string })[] {
  return events
    .map((e) => ({ ...e, ticket: extractTicket(e.branch) }))
    .filter((e): e is GitEvent & { ticket: string } => e.ticket !== null);
}
