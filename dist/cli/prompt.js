import { createInterface } from "node:readline/promises";
export function createReadlinePrompter() {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    return {
        async ask(question) {
            return rl.question(question);
        },
        async confirm(question, defaultYes) {
            const suffix = defaultYes ? "[Y/n]" : "[y/N]";
            const raw = (await rl.question(`${question} ${suffix} `)).trim().toLowerCase();
            if (raw === "")
                return defaultYes;
            return raw === "y" || raw === "yes";
        },
        close() {
            rl.close();
        },
    };
}
//# sourceMappingURL=prompt.js.map