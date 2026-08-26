import { DateTime } from "luxon";
import { describe, expect, it } from "vitest";
import { bestDescriptionFor, describeFromBranch, extractTicket } from "./ticket.js";
import type { GitEvent } from "./types.js";

describe("extractTicket", () => {
  it("pulls the ticket out of a type/TICKET-slug branch", () => {
    expect(extractTicket("fix/FFT-1326-android-image")).toBe("FFT-1326");
    expect(extractTicket("feature/FFO-1441-splash-handoff-align")).toBe("FFO-1441");
  });

  it("also matches when the ticket leads the branch name", () => {
    expect(extractTicket("RDA-475/appium-automation-launch-args")).toBe("RDA-475");
  });

  it("returns null for branches with no ticket", () => {
    expect(extractTicket("main")).toBeNull();
    expect(extractTicket("fix/section-title-typography")).toBeNull();
  });
});

describe("describeFromBranch", () => {
  it("de-kebabs the slug after the ticket", () => {
    expect(describeFromBranch("fix/FFT-1326-android-image", "FFT-1326")).toBe("FFT-1326: android image");
  });
});

function event(overrides: Partial<GitEvent>): GitEvent {
  return {
    timestamp: DateTime.fromISO("2026-08-24T10:00:00", { zone: "America/Montevideo" }),
    repo: "myr",
    branch: "fix/FFT-1326-android-image",
    ticket: "FFT-1326",
    description: null,
    kind: "checkout",
    ...overrides,
  };
}

describe("bestDescriptionFor", () => {
  it("prefers the most recent commit message over the branch-name fallback", () => {
    const events = [
      event({ kind: "checkout", timestamp: DateTime.fromISO("2026-08-24T09:00:00") }),
      event({ kind: "commit", description: "FFT-1326: removes prefetch", timestamp: DateTime.fromISO("2026-08-24T11:00:00") }),
    ];
    expect(bestDescriptionFor("FFT-1326", events)).toBe("FFT-1326: removes prefetch");
  });

  it("falls back to the branch slug when there is no commit message", () => {
    const events = [event({ kind: "checkout" })];
    expect(bestDescriptionFor("FFT-1326", events)).toBe("FFT-1326: android image");
  });

  it("prepends the ticket when a merge commit message doesn't already start with it", () => {
    const events = [event({ kind: "commit-merge", description: "Merged main into fix/FFT-1326-android-image" })];
    expect(bestDescriptionFor("FFT-1326", events)).toBe("FFT-1326: Merged main into fix/FFT-1326-android-image");
  });
});
