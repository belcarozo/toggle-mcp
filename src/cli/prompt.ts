import { createInterface } from "node:readline/promises";

export interface Prompter {
  ask(question: string): Promise<string>;
  confirm(question: string, defaultYes: boolean): Promise<boolean>;
  close(): void;
}

export function createReadlinePrompter(): Prompter {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return {
    async ask(question: string): Promise<string> {
      return rl.question(question);
    },
    async confirm(question: string, defaultYes: boolean): Promise<boolean> {
      const suffix = defaultYes ? "[Y/n]" : "[y/N]";
      const raw = (await rl.question(`${question} ${suffix} `)).trim().toLowerCase();
      if (raw === "") return defaultYes;
      return raw === "y" || raw === "yes";
    },
    close(): void {
      rl.close();
    },
  };
}
