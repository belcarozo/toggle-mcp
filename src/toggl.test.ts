import { afterEach, describe, expect, it, vi } from "vitest";
import { TogglClient } from "./toggl.js";

describe("TogglClient - request queue", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("a 429 on one call does not deadlock a different call already queued behind it", async () => {
    let callCount = 0;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        callCount++;
        if (callCount === 1) {
          return new Response(null, { status: 429, headers: { "Retry-After": "1" } });
        }
        return new Response(JSON.stringify([]), { status: 200 });
      }),
    );

    const client = new TogglClient("fake-token");
    // Before the fix, call A's internal 429-retry re-entered the module-level
    // queue from inside the task that was already occupying it, so call A
    // never resolved - and call B, queued behind it, never even started.
    const results = await Promise.all([
      client.listTimeEntries("2026-08-24", "2026-08-24"),
      client.listTimeEntries("2026-08-25", "2026-08-25"),
    ]);
    expect(results).toEqual([[], []]);
    expect(callCount).toBeGreaterThanOrEqual(3);
  }, 10_000);
});
