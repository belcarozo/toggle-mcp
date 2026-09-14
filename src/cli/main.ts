import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { formatDoctorReport, exitCodeFor, runDoctor } from "./doctor.js";
import { runInit } from "./init.js";
import { createReadlinePrompter } from "./prompt.js";

const HELP = `toggl-mcp <command> [options]

Commands:
  init              Interactive wizard to create or update the config file
  doctor            Check an existing config/setup for problems

Options:
  --config <path>   Config file path (default: ~/.config/toggl-mcp/config.json)
  --print           init only: print the resulting config instead of writing it
  --online          doctor only: also verify Toggl connectivity (costs API calls)
  -h, --help        Show this help
  -v, --version     Show the version

Running with no command starts the MCP stdio server.`;

function readVersion(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const pkgPath = join(here, "..", "..", "package.json");
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}

interface ParsedArgv {
  command: string | undefined;
  path?: string;
  print: boolean;
  online: boolean;
}

function parseArgv(argv: string[]): ParsedArgv {
  const [command, ...rest] = argv;
  const parsed: ParsedArgv = { command, print: false, online: false };
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--config") parsed.path = rest[++i];
    else if (rest[i] === "--print") parsed.print = true;
    else if (rest[i] === "--online") parsed.online = true;
  }
  return parsed;
}

export async function runCli(argv: string[]): Promise<number> {
  const { command, path, print, online } = parseArgv(argv);

  if (command === "-h" || command === "--help" || command === "help") {
    console.log(HELP);
    return 0;
  }
  if (command === "-v" || command === "--version") {
    console.log(readVersion());
    return 0;
  }
  if (command === "init") {
    const prompter = createReadlinePrompter();
    try {
      return await runInit(prompter, { path, print });
    } finally {
      prompter.close();
    }
  }
  if (command === "doctor") {
    const report = await runDoctor({ path, online });
    console.log(formatDoctorReport(report));
    return exitCodeFor(report);
  }

  console.error(`toggl-mcp: unknown command "${command ?? ""}"\n`);
  console.error(HELP);
  return 2;
}
