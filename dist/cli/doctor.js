import { DateTime } from "luxon";
import { DEFAULT_CONFIG_PATH, loadRawConfig, validateConfig } from "../config.js";
import { TogglClient } from "../toggl.js";
import { detectDefaultBranch, isGitRepo, previewTicketMatches, sampleBranches } from "./detect.js";
export async function runDoctor(options = {}) {
    const path = options.path ?? DEFAULT_CONFIG_PATH;
    const checks = [];
    let config = null;
    try {
        const raw = loadRawConfig(path);
        if (raw === null) {
            checks.push({ name: "config", status: "fail", message: `no config at ${path} - run "toggl-mcp init"` });
        }
        else {
            const result = validateConfig(raw);
            if (result.ok) {
                config = result.config;
                checks.push({ name: "config", status: "ok", message: path });
            }
            else {
                checks.push({ name: "config", status: "fail", message: result.issues.join("; ") });
            }
        }
    }
    catch (err) {
        checks.push({ name: "config", status: "fail", message: err.message });
    }
    if (!config)
        return { checks };
    checks.push(DateTime.now().setZone(config.timezone).isValid
        ? { name: "timezone", status: "ok", message: config.timezone }
        : { name: "timezone", status: "fail", message: `"${config.timezone}" is not a valid IANA timezone` });
    const validRepos = [];
    for (const repo of config.repos) {
        if (!isGitRepo(repo)) {
            checks.push({ name: `repo ${repo}`, status: "fail", message: "not a git repository" });
            continue;
        }
        validRepos.push(repo);
        const branches = sampleBranches(repo, 20);
        checks.push({ name: `repo ${repo}`, status: "ok", message: `${branches.length} recent branch(es) found` });
    }
    const sampledBranches = validRepos.flatMap((r) => sampleBranches(r, 20));
    if (sampledBranches.length > 0) {
        const matched = previewTicketMatches(config.ticketPattern, sampledBranches).filter((p) => p.match !== null).length;
        checks.push(matched > 0
            ? { name: "ticketPattern", status: "ok", message: `matches ${matched}/${sampledBranches.length} recent branches` }
            : {
                name: "ticketPattern",
                status: "warn",
                message: `matches 0/${sampledBranches.length} recent branches - run "toggl-mcp init" to pick a different pattern`,
            });
    }
    for (const repo of validRepos) {
        const defaultBranch = detectDefaultBranch(repo);
        if (defaultBranch && !config.baseBranches.includes(defaultBranch)) {
            checks.push({
                name: `baseBranches (${repo})`,
                status: "warn",
                message: `default branch "${defaultBranch}" isn't in baseBranches - it'll be treated as billable work`,
            });
        }
    }
    checks.push(process.env.TOGGL_API_TOKEN
        ? { name: "TOGGL_API_TOKEN", status: "ok", message: "set" }
        : { name: "TOGGL_API_TOKEN", status: "fail", message: "not set - required by the MCP server, pass via the client's env config" });
    if (options.online && process.env.TOGGL_API_TOKEN) {
        try {
            const client = new TogglClient(process.env.TOGGL_API_TOKEN);
            const me = await client.me();
            checks.push({ name: "Toggl connectivity", status: "ok", message: `authenticated as ${me.email}` });
            await client.findProjectId(me.default_workspace_id, config.projectName);
            checks.push({ name: "Toggl project", status: "ok", message: config.projectName });
        }
        catch (err) {
            checks.push({ name: "Toggl connectivity", status: "fail", message: err.message });
        }
    }
    return { checks };
}
export function formatDoctorReport(report) {
    const lines = report.checks.map((c) => `  ${c.status.padEnd(4)}  ${c.name}: ${c.message}`);
    const failCount = report.checks.filter((c) => c.status === "fail").length;
    const warnCount = report.checks.filter((c) => c.status === "warn").length;
    lines.push("", `${failCount} failure(s), ${warnCount} warning(s)`);
    return lines.join("\n");
}
export function exitCodeFor(report) {
    return report.checks.some((c) => c.status === "fail") ? 1 : 0;
}
//# sourceMappingURL=doctor.js.map