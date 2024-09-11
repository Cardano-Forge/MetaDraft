import fs from "node:fs";

// Load templates from a text file.
export function loadTemplates(filepath: string): string[] {
  const rules: string[] = [];
  const data: string[] = fs
    .readFileSync(filepath, "utf8")
    .trim()
    .split(/\r?\n/);

  for (const line of data) {
    if (line.startsWith("#") || !line.trim()) continue;

    rules.push(line);
  }

  return rules;
}
