import type { GitEvent } from "./types.js";
import { DEFAULT_TICKET_PATTERN } from "./defaults.js";

/** Pull a ticket ID (e.g. "FFT-1326") out of a branch name, if present. */
export function extractTicket(branch: string, pattern: string = DEFAULT_TICKET_PATTERN): string | null {
  const match = branch.match(new RegExp(pattern));
  if (!match) return null;
  return (match[1] ?? match[0]).toUpperCase();
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
  /** True when `description` came from the branch-slug fallback, not a real commit message - the case worth enriching with outside context. */
  weak?: boolean;
}

const LOW_INFORMATION_MESSAGE = /^(fix(es|ed)?|wip|update[sd]?|tmp|temp|misc|checkpoint|changes|cleanup)\.?$/i;

/**
 * A commit message that's just a generic placeholder ("fix", "wip", ...)
 * carries no more information than the ticket id itself, so the branch-name
 * fallback (which at least names the change) is more useful to show.
 */
function isLowInformation(description: string, pattern: string): boolean {
  // No "i" flag: must match extractTicket's own case-sensitivity exactly, so a
  // custom pattern that's deliberately case-sensitive isn't stripped here for
  // a ticket shape extractTicket itself would never have recognized.
  const leadingTicket = new RegExp(`^(?:${pattern})\\s*:?\\s*`);
  const stripped = description.replace(leadingTicket, "").trim();
  return LOW_INFORMATION_MESSAGE.test(stripped);
}

/**
 * Guarantee the ticket is visible even if `raw` didn't happen to start with it
 * (e.g. a generic "Merged main into X" commit message, or a context signal's text).
 */
export function withTicketPrefix(ticket: string, raw: string): string {
  return new RegExp(`^${ticket}\\b`, "i").test(raw) ? raw : `${ticket}: ${raw}`;
}

/**
 * Resolve the best available attribution for a ticket from a set of git
 * events attributed to it, most recent first: a real commit message wins
 * over the branch-name fallback, since it's the more informative of the two -
 * unless that commit message is itself a generic placeholder, in which case
 * the branch name is more informative. `weak: true` marks the fallback case,
 * so callers can tell a real commit message from a guess worth enriching.
 */
export function attributeTicket(
  ticket: string,
  events: GitEvent[],
  pattern: string = DEFAULT_TICKET_PATTERN,
): TicketAttribution {
  const sorted = [...events].sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
  const withCommitMessage = sorted.find(
    (e) =>
      (e.kind === "commit" || e.kind === "commit-merge" || e.kind === "commit-amend") &&
      e.description &&
      !isLowInformation(e.description, pattern),
  );
  if (withCommitMessage?.description) {
    return { ticket, description: withTicketPrefix(ticket, withCommitMessage.description) };
  }
  return { ticket, description: withTicketPrefix(ticket, describeFromBranch(sorted[0].branch, ticket)), weak: true };
}

/** Thin string wrapper over `attributeTicket`, kept for callers that only need the text. */
export function bestDescriptionFor(
  ticket: string,
  events: GitEvent[],
  pattern: string = DEFAULT_TICKET_PATTERN,
): string {
  return attributeTicket(ticket, events, pattern).description;
}

/** Attach `ticket` to every event whose branch resolves to one, dropping the rest. */
export function withTickets(
  events: GitEvent[],
  pattern: string = DEFAULT_TICKET_PATTERN,
): (GitEvent & { ticket: string })[] {
  return events
    .map((e) => ({ ...e, ticket: extractTicket(e.branch, pattern) }))
    .filter((e): e is GitEvent & { ticket: string } => e.ticket !== null);
}
