import { describe, expect, it } from "vitest";
import { configSchema, validateConfig } from "./config.js";
import { DEFAULT_BASE_BRANCHES, DEFAULT_TICKET_PATTERN } from "./defaults.js";

const minimal = {
  timezone: "America/Montevideo",
  projectName: "Engineering",
  workday: { start: "09:00", end: "17:00", lunchMinutes: 30, lunchAt: "12:30", days: ["mon", "tue", "wed", "thu", "fri"] },
  repos: ["/fake/repo"],
};

describe("configSchema", () => {
  it("defaults ticketPattern and baseBranches to today's exact hardcoded behavior", () => {
    const result = configSchema.parse(minimal);
    expect(result.ticketPattern).toBe(DEFAULT_TICKET_PATTERN);
    expect(result.baseBranches).toEqual(DEFAULT_BASE_BRANCHES);
  });

  it("accepts a config that still carries the removed authorEmails/calendarIds fields and drops them", () => {
    const legacy = { ...minimal, authorEmails: ["a@b.com"], calendarIds: ["primary"] };
    const result = configSchema.parse(legacy);
    expect(result).not.toHaveProperty("authorEmails");
    expect(result).not.toHaveProperty("calendarIds");
  });

  it("rejects a ticketPattern that isn't a compilable regex", () => {
    const result = validateConfig({ ...minimal, ticketPattern: "([A-Z" });
    expect(result.ok).toBe(false);
  });

  it("accepts a custom ticketPattern and baseBranches", () => {
    const result = validateConfig({ ...minimal, ticketPattern: "(\\d{3,})", baseBranches: ["trunk"] });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.config.ticketPattern).toBe("(\\d{3,})");
      expect(result.config.baseBranches).toEqual(["trunk"]);
    }
  });

  it("preserves an explicitly empty tags array instead of re-defaulting it", () => {
    const result = validateConfig({ ...minimal, tags: [] });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.config.tags).toEqual([]);
  });
});
