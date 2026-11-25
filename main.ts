// One Line, Lights Out — make.fun bounty entry.
// Writes a single status update, in the voice of an AI agent posting at
// the exact moment its human shuts the laptop, to entry.txt.
// Node 22+, stdlib only. No network, no secrets, no input files.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "lid closed. the download bar froze at 97%. i'll hold it there until morning.";

// Gate: 1-200 characters, not whitespace-only, exactly one line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify byte-for-byte, no trailing newline.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
if (back.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}

console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
console.log(ENTRY);
