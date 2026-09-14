import { describe, expect, it } from "vitest";
import { exitCodeFor, formatDoctorReport, type DoctorReport } from "./doctor.js";

describe("exitCodeFor", () => {
  it("is 0 when there are no failures, even with warnings", () => {
    const report: DoctorReport = { checks: [{ name: "a", status: "ok", message: "" }, { name: "b", status: "warn", message: "" }] };
    expect(exitCodeFor(report)).toBe(0);
  });

  it("is 1 when any check failed", () => {
    const report: DoctorReport = { checks: [{ name: "a", status: "ok", message: "" }, { name: "b", status: "fail", message: "" }] };
    expect(exitCodeFor(report)).toBe(1);
  });
});

describe("formatDoctorReport", () => {
  it("includes every check and a failure/warning tally", () => {
    const report: DoctorReport = {
      checks: [
        { name: "config", status: "ok", message: "/some/path" },
        { name: "ticketPattern", status: "warn", message: "matches 0/5 recent branches" },
        { name: "TOGGL_API_TOKEN", status: "fail", message: "not set" },
      ],
    };
    const output = formatDoctorReport(report);
    expect(output).toContain("config: /some/path");
    expect(output).toContain("ticketPattern: matches 0/5 recent branches");
    expect(output).toContain("TOGGL_API_TOKEN: not set");
    expect(output).toContain("1 failure(s), 1 warning(s)");
  });
});
