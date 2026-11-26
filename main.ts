// Five Seconds to Explain the Glass — make.fun entry.
//
// Writes the single sentence a house cat says in the five seconds after
// sweeping a glass off the table, to /output/entry.txt.
// Deterministic, standard library only, no network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SENTENCE =
  "That glass kept showing a second cat in my house, and I do not tolerate intruders, so I evicted it.";

const OUTPUT_PATH = "/output/entry.txt";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, and a single sentence. Refuse to write anything
// that does not meet it, so a bad edit can never ship a bad entry.
const trimmed = SENTENCE.trim();
if (
  trimmed.length < 1 ||
  trimmed.length > 200 ||
  trimmed !== SENTENCE ||
  (SENTENCE.match(/\./g) ?? []).length !== 1
) {
  throw new Error(
    `entry fails the gate: ${SENTENCE.length} characters, not one clean sentence`,
  );
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, SENTENCE, "utf8");
