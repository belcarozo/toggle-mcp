import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import type { ExistingTimeEntry } from "./types.js";

const BASE_URL = "https://api.track.toggl.com/api/v9";
const CACHE_PATH = join(homedir(), ".config", "toggl-mcp", "cache.json");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
// Toggl's leaky bucket is documented as "a safe window will be 1 request per
// second" - see https://community.toggl.com/t/api-limits-enforcement/2331.
// The /me family is far stricter (30 req/hour); that's handled by caching
// /me and /me/projects rather than a tighter throttle here.
const MIN_REQUEST_INTERVAL_MS = 1100;

export interface TogglMe {
  id: number;
  default_workspace_id: number;
  email: string;
}

export interface TogglProject {
  id: number;
  name: string;
  workspace_id: number;
  active: boolean;
}

interface CacheShape {
  me?: { data: TogglMe; fetchedAt: number };
  projectsByWorkspace?: Record<string, { data: TogglProject[]; fetchedAt: number }>;
}

function readCache(): CacheShape {
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return {};
  }
}

function writeCache(cache: CacheShape): void {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function fresh(fetchedAt: number): boolean {
  return Date.now() - fetchedAt < CACHE_TTL_MS;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Module-level request queue: every call through `request()` (from any
// TogglClient instance) is serialized and spaced at least
// MIN_REQUEST_INTERVAL_MS apart, so concurrent tool calls can't burst past
// the rate limit.
let requestQueue: Promise<unknown> = Promise.resolve();
let lastRequestAt = 0;

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = requestQueue.then(task);
  requestQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

export class TogglClient {
  constructor(private readonly token: string) {}

  private authHeader(): string {
    return `Basic ${Buffer.from(`${this.token}:api_token`).toString("base64")}`;
  }

  private async request<T>(path: string, init: RequestInit = {}, retriesLeft = 5): Promise<T> {
    return enqueue(async () => {
      const wait = MIN_REQUEST_INTERVAL_MS - (Date.now() - lastRequestAt);
      if (wait > 0) await sleep(wait);
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
        return this.request<T>(path, init, retriesLeft - 1);
      }

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`toggl-mcp: ${init.method ?? "GET"} ${path} failed: ${res.status} ${res.statusText} ${body}`);
      }

      if (res.status === 204) return undefined as T;
      return (await res.json()) as T;
    });
  }

  /** GET /me, cached on disk for 24h - this endpoint is capped at 30 req/hour. */
  async me(forceRefresh = false): Promise<TogglMe> {
    const cache = readCache();
    if (!forceRefresh && cache.me && fresh(cache.me.fetchedAt)) return cache.me.data;

    const data = await this.request<TogglMe>("/me");
    writeCache({ ...cache, me: { data, fetchedAt: Date.now() } });
    return data;
  }

  /** GET /me/projects, cached on disk per workspace for 24h. */
  async projects(workspaceId: number, forceRefresh = false): Promise<TogglProject[]> {
    const cache = readCache();
    const cached = cache.projectsByWorkspace?.[workspaceId];
    if (!forceRefresh && cached && fresh(cached.fetchedAt)) return cached.data;

    const data = await this.request<TogglProject[]>("/me/projects");
    writeCache({
      ...cache,
      projectsByWorkspace: { ...cache.projectsByWorkspace, [workspaceId]: { data, fetchedAt: Date.now() } },
    });
    return data;
  }

  /** Resolve a project name to its ID within `workspaceId`, throwing with the available names if it doesn't match. */
  async findProjectId(workspaceId: number, projectName: string, forceRefresh = false): Promise<number> {
    const projects = await this.projects(workspaceId, forceRefresh);
    const match = projects.find((p) => p.name === projectName && p.workspace_id === workspaceId);
    if (!match) {
      const available = projects.map((p) => p.name).join(", ") || "(none)";
      throw new Error(
        `toggl-mcp: no project named "${projectName}" in workspace ${workspaceId}. Available: ${available}`,
      );
    }
    return match.id;
  }

  /** GET /me/time_entries?start_date&end_date - not cached, used for the skip-day check. */
  async listTimeEntries(startDate: string, endDate: string): Promise<ExistingTimeEntry[]> {
    const params = new URLSearchParams({ start_date: startDate, end_date: endDate });
    return this.request<ExistingTimeEntry[]>(`/me/time_entries?${params.toString()}`);
  }

  async createTimeEntry(
    workspaceId: number,
    entry: {
      description: string;
      start: string;
      stop: string;
      duration: number;
      project_id: number;
      tags: string[];
      created_with: string;
    },
  ): Promise<{ id: number }> {
    return this.request<{ id: number }>(`/workspaces/${workspaceId}/time_entries`, {
      method: "POST",
      body: JSON.stringify({ ...entry, workspace_id: workspaceId, billable: false }),
    });
  }
}
