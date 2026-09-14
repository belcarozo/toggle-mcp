import { DEFAULT_TICKET_PATTERN } from "./defaults.js";
/** Pull a ticket ID (e.g. "FFT-1326") out of a branch name, if present. */
export function extractTicket(branch, pattern = DEFAULT_TICKET_PATTERN) {
    const match = branch.match(new RegExp(pattern));
    if (!match)
        return null;
    return (match[1] ?? match[0]).toUpperCase();
}
/**
 * Build a human description from a branch name when there's no commit
 * message to use: strip the type/ prefix and the ticket itself, de-kebab
 * what's left. "fix/FFT-1326-android-image" -> "FFT-1326: android image".
 */
export function describeFromBranch(branch, ticket) {
    const idx = branch.search(new RegExp(ticket, "i"));
    let rest = idx >= 0 ? branch.slice(idx + ticket.length) : branch;
    rest = rest
        .replace(/^[-/_]+/, "")
        .replace(/[-_/]+/g, " ")
        .trim();
    return rest ? `${ticket}: ${rest}` : ticket;
}
const LOW_INFORMATION_MESSAGE = /^(fix(es|ed)?|wip|update[sd]?|tmp|temp|misc|checkpoint|changes|cleanup)\.?$/i;
/**
 * A commit message that's just a generic placeholder ("fix", "wip", ...)
 * carries no more information than the ticket id itself, so the branch-name
 * fallback (which at least names the change) is more useful to show.
 */
function isLowInformation(description, pattern) {
    // No "i" flag: must match extractTicket's own case-sensitivity exactly, so a
    // custom pattern that's deliberately case-sensitive isn't stripped here for
    // a ticket shape extractTicket itself would never have recognized.
    const leadingTicket = new RegExp(`^(?:${pattern})\\s*:?\\s*`);
    const stripped = description.replace(leadingTicket, "").trim();
    return LOW_INFORMATION_MESSAGE.test(stripped);
}
/**
 * Resolve the best available description for a ticket from a set of git
 * events attributed to it, most recent first: a real commit message wins
 * over the branch-name fallback, since it's the more informative of the two -
 * unless that commit message is itself a generic placeholder, in which case
 * the branch name is more informative.
 */
export function bestDescriptionFor(ticket, events, pattern = DEFAULT_TICKET_PATTERN) {
    const sorted = [...events].sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
    const withCommitMessage = sorted.find((e) => (e.kind === "commit" || e.kind === "commit-merge" || e.kind === "commit-amend") &&
        e.description &&
        !isLowInformation(e.description, pattern));
    const raw = withCommitMessage?.description ?? describeFromBranch(sorted[0].branch, ticket);
    // Guarantee the ticket is visible even if the winning commit message didn't
    // happen to start with it (e.g. a generic "Merged main into X" message).
    return new RegExp(`^${ticket}\\b`, "i").test(raw) ? raw : `${ticket}: ${raw}`;
}
/** Attach `ticket` to every event whose branch resolves to one, dropping the rest. */
export function withTickets(events, pattern = DEFAULT_TICKET_PATTERN) {
    return events
        .map((e) => ({ ...e, ticket: extractTicket(e.branch, pattern) }))
        .filter((e) => e.ticket !== null);
}
//# sourceMappingURL=ticket.js.map