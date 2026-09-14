import { describe, expect, it } from "vitest";
import type { Config } from "../types.js";
import {
  answersToConfig,
  formatClasses,
  formatList,
  parseClasses,
  parseList,
  parseRepoList,
  parseWeekdays,
} from "./questions.js";

const realConfig: Config = {
  timezone: "America/Montevideo",
  projectName: "Mobile Development",
  workday: { start: "10:00", end: "18:00", lunchMinutes: 30, lunchAt: "13:00", days: ["mon", "tue", "wed", "thu", "fri"] },
  classes: [
    { label: "Solfeggio class", day: "mon", start: "14:00", end: "15:30" },
    { label: "Solfeggio class", day: "thu", start: "14:00", end: "15:30" },
    { label: "Dance class", day: "wed", start: "17:00", end: "19:00" },
    { label: "Italian class", day: "fri", start: "15:00", end: "16:30" },
    { label: "Expression class", day: "fri", start: "18:00", end: "21:00" },
  ],
  nonWorkTitlePatterns: ["\\bclass\\b"],
  repos: ["/Users/belen.carozo/projects/myr"],
  ticketPattern: "([A-Za-z]{2,4}-\\d+)",
  baseBranches: ["main", "master", "develop"],
  minEntryMinutes: 15,
  roundToMinutes: 15,
  tags: [],
  createdWith: "toggl-mcp",
};

describe("answersToConfig round-trip", () => {
  it("reproduces the base config exactly when every answer is blank (Enter-through)", () => {
    expect(answersToConfig(realConfig, {})).toEqual(realConfig);
  });

  it("preserves an explicitly-empty tags array rather than re-defaulting it", () => {
    const result = answersToConfig(realConfig, {}) as Config;
    expect(result.tags).toEqual([]);
  });

  it("changes only the field that was answered, leaving everything else identical", () => {
    const result = answersToConfig(realConfig, { projectName: "New Project" }) as Config;
    expect(result.projectName).toBe("New Project");
    expect({ ...result, projectName: realConfig.projectName }).toEqual(realConfig);
  });

  it("lets '-' explicitly clear a non-empty list field", () => {
    const result = answersToConfig(realConfig, { nonWorkTitlePatterns: "-" }) as Config;
    expect(result.nonWorkTitlePatterns).toEqual([]);
  });

  it("round-trips a regex value containing a comma quantifier without corrupting it", () => {
    // Regression: formatList/parseList used to split on "," - "\\d{2,4}" would silently
    // become two separate list items ("\\d{2" and "4}") on the very next Enter-through init run.
    const withCommaRegex: Config = { ...realConfig, nonWorkTitlePatterns: ["standup", "\\d{2,4}"] };
    expect(answersToConfig(withCommaRegex, {})).toEqual(withCommaRegex);
  });
});

describe("list parsers", () => {
  it("parseList trims, drops empties, and treats '-' as empty", () => {
    expect(parseList("a; b ;;c")).toEqual(["a", "b", "c"]);
    expect(parseList("-")).toEqual([]);
    expect(parseList("")).toEqual([]);
  });

  it("does not split a value on a comma - only on the semicolon delimiter", () => {
    expect(parseList("\\d{2,4}; standup")).toEqual(["\\d{2,4}", "standup"]);
  });

  it("parseRepoList expands a leading ~", () => {
    const [repo] = parseRepoList("~/projects/foo");
    expect(repo).not.toMatch(/^~/);
    expect(repo.endsWith("/projects/foo")).toBe(true);
  });

  it("parseWeekdays validates against the weekday enum", () => {
    expect(parseWeekdays("mon;wed;fri")).toEqual(["mon", "wed", "fri"]);
    expect(() => parseWeekdays("mon;funday")).toThrow();
  });
});

describe("classes format/parse", () => {
  it("round-trips through format and parse", () => {
    const formatted = formatClasses(realConfig.classes);
    expect(parseClasses(formatted)).toEqual(realConfig.classes);
  });

  it("rejects a malformed entry", () => {
    expect(() => parseClasses("Gym@wed@07:00")).toThrow();
    expect(() => parseClasses("Gym@notaday@07:00@08:00")).toThrow();
  });

  it("treats '-' and '' as no recurring commitments", () => {
    expect(parseClasses("-")).toEqual([]);
    expect(parseClasses("")).toEqual([]);
  });

  it("throws a clear error rather than silently corrupting a label containing '@' or ';'", () => {
    expect(() => formatClasses([{ label: "Standup; sync", day: "mon", start: "09:00", end: "09:15" }])).toThrow(/";"/);
    expect(() => formatClasses([{ label: "Team @ HQ", day: "mon", start: "09:00", end: "09:15" }])).toThrow(/"@"/);
  });
});

describe("formatList", () => {
  it("joins with a semicolon and space", () => {
    expect(formatList(["a", "b"])).toBe("a; b");
    expect(formatList([])).toBe("");
  });

  it("throws a clear error rather than silently corrupting a value containing ';'", () => {
    expect(() => formatList(["a", "b; c"])).toThrow(/";"/);
  });
});
