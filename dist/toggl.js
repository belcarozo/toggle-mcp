import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
const BASE_URL = "https://api.track.toggl.com/api/v9";
const CACHE_PATH = join(homedir(), ".config", "toggl-mcp", "cache.json");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
// Toggl's leaky bucket is documented as "a safe window will be 1 request per
// second" - see https://community.toggl.com/t/api-limits-enforcement/2331.
// The /me family is far stricter (30 req/hour); that's handled by caching
// /me and /me/projects rather than a tighter throttle here.
const MIN_REQUEST_INTERVAL_MS = 1100;
function readCache() {
    try {
        return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
    }
    catch {
        return {};
    }
}
function writeCache(cache) {
    mkdirSync(dirname(CACHE_PATH), { recursive: true });
    writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}
function fresh(fetchedAt) {
    return Date.now() - fetchedAt < CACHE_TTL_MS;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Module-level request queue: every call through `request()` (from any
// TogglClient instance) is serialized and spaced at least
// MIN_REQUEST_INTERVAL_MS apart, so concurrent tool calls can't burst past
// the rate limit.
let requestQueue = Promise.resolve();
let lastRequestAt = 0;
function enqueue(task) {
    const result = requestQueue.then(task);
    requestQueue = result.then(() => undefined, () => undefined);
    return result;
}
export class TogglClient {
    token;
    constructor(token) {
        this.token = token;
    }
    authHeader() {
        return `Basic ${Buffer.from(`${this.token}:api_token`).toString("base64")}`;
    }
    request(path, init = {}) {
        // The whole retry sequence must run inside a single enqueue()'d task.
        // Retrying by calling back into a method that itself calls enqueue()
        // would re-enter the module-level queue from within the task that's
        // currently occupying it - a circular wait that hangs forever.
        return enqueue(() => this.attempt(path, init));
    }
    async attempt(path, init, retriesLeft = 5) {
        const wait = MIN_REQUEST_INTERVAL_MS - (Date.now() - lastRequestAt);
        if (wait > 0)
            await sleep(wait);
        lastRequestAt = Date.now();
        const res = await fetch(`${BASE_URL}${path}`, {
            ...init,
            headers: {
                Authorization: this.authHeader(),
                "Content-Type": "application/json",
                ...init.headers,
            },
        });
        if (res.status === 429) {
            if (retriesLeft <= 0) {
                throw new Error(`toggl-mcp: rate limited (429) on ${path} with no retries left`);
            }
            const retryAfterHeader = res.headers.get("Retry-After");
            const retryAfterMs = retryAfterHeader ? Number(retryAfterHeader) * 1000 : 2000 * (6 - retriesLeft);
            await sleep(retryAfterMs);
            return this.attempt(path, init, retriesLeft - 1);
        }
        if (!res.ok) {
            const body = await res.text().catch(() => "");
            throw new Error(`toggl-mcp: ${init.method ?? "GET"} ${path} failed: ${res.status} ${res.statusText} ${body}`);
        }
        if (res.status === 204)
            return undefined;
        return (await res.json());
    }
    /** GET /me, cached on disk for 24h - this endpoint is capped at 30 req/hour. */
    async me(forceRefresh = false) {
        const cache = readCache();
        if (!forceRefresh && cache.me && fresh(cache.me.fetchedAt))
            return cache.me.data;
        const data = await this.request("/me");
        writeCache({ ...cache, me: { data, fetchedAt: Date.now() } });
        return data;
    }
    /** GET /me/projects, cached on disk per workspace for 24h. */
    async projects(workspaceId, forceRefresh = false) {
        const cache = readCache();
        const cached = cache.projectsByWorkspace?.[workspaceId];
        if (!forceRefresh && cached && fresh(cached.fetchedAt))
            return cached.data;
        const data = await this.request("/me/projects");
        writeCache({
            ...cache,
            projectsByWorkspace: { ...cache.projectsByWorkspace, [workspaceId]: { data, fetchedAt: Date.now() } },
        });
        return data;
    }
    /** Resolve a project name to its ID within `workspaceId`, throwing with the available names if it doesn't match. */
    async findProjectId(workspaceId, projectName, forceRefresh = false) {
        const projects = await this.projects(workspaceId, forceRefresh);
        const match = projects.find((p) => p.name === projectName && p.workspace_id === workspaceId);
        if (!match) {
            const available = projects.map((p) => p.name).join(", ") || "(none)";
            throw new Error(`toggl-mcp: no project named "${projectName}" in workspace ${workspaceId}. Available: ${available}`);
        }
        return match.id;
    }
    /** GET /me/time_entries?start_date&end_date - not cached, used for the skip-day check. */
    async listTimeEntries(startDate, endDate) {
        const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
        return this.request(`/me/time_entries?${params.toString()}`);
    }
    async createTimeEntry(workspaceId, entry) {
        return this.request(`/workspaces/${workspaceId}/time_entries`, {
            method: "POST",
            body: JSON.stringify({ ...entry, workspace_id: workspaceId, billable: false }),
        });
    }
}
//# sourceMappingURL=toggl.js.map