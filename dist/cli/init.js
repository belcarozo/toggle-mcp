import { DEFAULT_CONFIG_PATH, loadRawConfig, validateConfig, writeConfig } from "../config.js";
import { TogglClient } from "../toggl.js";
import { detectDefaultBranch, detectTimezone, isGitRepo, previewTicketMatches, sampleBranches } from "./detect.js";
import { STARTER_CONFIG, answersToConfig, buildFieldSpecs, defaultAnswer } from "./questions.js";
function renderRegistrationSnippet(entryPath) {
    return JSON.stringify({
        mcpServers: {
            "toggl-mcp": {
                command: "node",
                args: [entryPath],
                env: { TOGGL_API_TOKEN: "your-toggl-api-token" },
            },
        },
    }, null, 2);
}
async function askUntilValid(prompter, question, parse) {
    for (;;) {
        const raw = await prompter.ask(`${question}: `);
        try {
            return parse(raw);
        }
        catch (err) {
            console.log(err.message);
        }
    }
}
async function collectRepos(prompter, base) {
    const spec = buildFieldSpecs().find((s) => s.id === "repos");
    return askUntilValid(prompter, `${spec.prompt} [${defaultAnswer(spec, base)}]`, (raw) => {
        const repos = raw.trim() === "" ? base.repos : spec.parse(raw);
        if (repos.length === 0)
            throw new Error("toggl-mcp: at least one repo path is required");
        const bad = repos.filter((r) => !isGitRepo(r));
        if (bad.length > 0) {
            throw new Error(`toggl-mcp: not a git repo: ${bad.join(", ")}`);
        }
        return repos;
    });
}
async function collectTicketPattern(prompter, base, repos) {
    const branches = repos.flatMap((r) => sampleBranches(r, 20)).slice(0, 20);
    const spec = buildFieldSpecs().find((s) => s.id === "ticketPattern");
    if (branches.length > 0) {
        const preview = previewTicketMatches(base.ticketPattern, branches);
        const matched = preview.filter((p) => p.match !== null).length;
        console.log(`\nSampled ${branches.length} recent branch name(s) in your repo(s).`);
        console.log(`Current pattern "${base.ticketPattern}" matches ${matched}/${branches.length} of them.`);
        for (const p of preview.slice(0, 5))
            console.log(`  ${p.branch} -> ${p.match ?? "(no match)"}`);
    }
    else {
        console.log("\n(no branches found to preview against - pattern will be validated for syntax only)");
    }
    for (;;) {
        const pattern = await askUntilValid(prompter, `${spec.prompt} [${defaultAnswer(spec, base)}]`, (raw) => raw.trim() === "" ? base.ticketPattern : spec.parse(raw));
        if (branches.length === 0 || pattern === base.ticketPattern)
            return pattern;
        const preview = previewTicketMatches(pattern, branches);
        const matched = preview.filter((p) => p.match !== null).length;
        console.log(`"${pattern}" matches ${matched}/${branches.length} sampled branches.`);
        for (const p of preview.slice(0, 5))
            console.log(`  ${p.branch} -> ${p.match ?? "(no match)"}`);
        if (await prompter.confirm("Use this pattern?", true))
            return pattern;
    }
}
function requireProjectName(value) {
    if (value.trim() === "")
        throw new Error("toggl-mcp: a Toggl project name is required");
    return value;
}
async function pickProjectName(prompter, base) {
    const spec = buildFieldSpecs().find((s) => s.id === "projectName");
    const token = process.env.TOGGL_API_TOKEN;
    if (!token) {
        console.log("\n(TOGGL_API_TOKEN is not set in this shell, so I can't list your real Toggl projects - type the exact name.)");
        return askUntilValid(prompter, `${spec.prompt} [${defaultAnswer(spec, base)}]`, (raw) => raw.trim() === "" ? requireProjectName(base.projectName) : spec.parse(raw));
    }
    try {
        const client = new TogglClient(token);
        const me = await client.me();
        const projects = await client.projects(me.default_workspace_id);
        if (projects.length === 0) {
            console.log("\n(no projects found in your default Toggl workspace - type the exact name.)");
            return askUntilValid(prompter, `${spec.prompt} [${defaultAnswer(spec, base)}]`, (raw) => raw.trim() === "" ? requireProjectName(base.projectName) : spec.parse(raw));
        }
        console.log("\nYour Toggl projects:");
        projects.forEach((p, i) => console.log(`  ${i + 1}. ${p.name}`));
        return askUntilValid(prompter, `Pick a number, or type a project name [${defaultAnswer(spec, base)}]`, (raw) => {
            if (raw.trim() === "")
                return requireProjectName(base.projectName);
            const n = Number(raw.trim());
            if (Number.isInteger(n) && n >= 1 && n <= projects.length)
                return projects[n - 1].name;
            return spec.parse(raw);
        });
    }
    catch (err) {
        console.log(`\n(couldn't reach Toggl to list projects: ${err.message} - type the exact name.)`);
        return askUntilValid(prompter, `${spec.prompt} [${defaultAnswer(spec, base)}]`, (raw) => raw.trim() === "" ? requireProjectName(base.projectName) : spec.parse(raw));
    }
}
export async function runInit(prompter, options = {}) {
    const path = options.path ?? DEFAULT_CONFIG_PATH;
    let base = { ...STARTER_CONFIG, timezone: detectTimezone() ?? STARTER_CONFIG.timezone };
    let hadExisting = false;
    try {
        const raw = loadRawConfig(path);
        if (raw !== null) {
            const result = validateConfig(raw);
            if (result.ok) {
                base = result.config;
                hadExisting = true;
                console.log(`Found an existing config at ${path} - press Enter to keep any value as-is.\n`);
            }
            else {
                console.log(`Found a config at ${path}, but it's invalid:\n  ${result.issues.join("\n  ")}`);
                if (!(await prompter.confirm("Start fresh instead?", true))) {
                    return 1;
                }
            }
        }
        else {
            console.log(`No existing config found - let's create one at ${path}.\n`);
        }
    }
    catch (err) {
        console.log(`${err.message}`);
        if (!(await prompter.confirm("Start fresh instead?", true)))
            return 1;
    }
    if (!process.env.TOGGL_API_TOKEN) {
        const token = (await prompter.ask("Toggl API token (get one at https://track.toggl.com/profile) - used only for this session to look up your real " +
            "workspace/projects below, never written to config.json; leave blank to skip and type the project name manually: ")).trim();
        if (token !== "")
            process.env.TOGGL_API_TOKEN = token;
    }
    const answers = {};
    const repos = await collectRepos(prompter, base);
    answers.repos = repos.join(", ");
    const ticketPattern = await collectTicketPattern(prompter, base, repos);
    answers.ticketPattern = ticketPattern;
    for (const spec of buildFieldSpecs()) {
        if (spec.id === "repos" || spec.id === "ticketPattern")
            continue; // already collected above
        if (spec.id === "projectName") {
            answers.projectName = await pickProjectName(prompter, base);
            continue;
        }
        answers[spec.id] = await askUntilValid(prompter, `${spec.prompt} [${defaultAnswer(spec, base)}]`, (raw) => {
            spec.parse(raw.trim() === "" ? defaultAnswer(spec, base) : raw); // validate before accepting
            return raw;
        });
    }
    const draft = answersToConfig(base, answers);
    const result = validateConfig(draft);
    if (!result.ok) {
        console.log(`\nSomething doesn't add up:\n  ${result.issues.join("\n  ")}`);
        return 1;
    }
    const baseBranchMismatches = repos
        .map((r) => ({ repo: r, defaultBranch: detectDefaultBranch(r) }))
        .filter((r) => r.defaultBranch && !result.config.baseBranches.includes(r.defaultBranch));
    for (const m of baseBranchMismatches) {
        console.log(`\nNote: ${m.repo}'s default branch "${m.defaultBranch}" isn't in baseBranches - it'll be treated as billable work.`);
    }
    console.log(`\n${JSON.stringify(result.config, null, 2)}\n`);
    if (options.print)
        return 0;
    if (!(await prompter.confirm(hadExisting ? "Write this over the existing config?" : "Write this config?", true))) {
        console.log("Not written.");
        return 0;
    }
    writeConfig(result.config, path);
    console.log(`\nWrote ${path}${hadExisting ? ` (previous version backed up to ${path}.bak)` : ""}.`);
    console.log("\nTOGGL_API_TOKEN is read from the environment only - it is never stored in config.json. " +
        "Get one at https://track.toggl.com/profile and pass it via your MCP client's server env config, e.g.:\n");
    console.log(renderRegistrationSnippet(new URL("../index.js", import.meta.url).pathname));
    console.log('\nRun "toggl-mcp doctor" to sanity-check this setup.');
    return 0;
}
//# sourceMappingURL=init.js.map