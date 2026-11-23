import * as fs from "node:fs";

const TITLE = "The Reeds";
const BLURB =
  "Milo on saxophone, June on bass, and Toad on drums — three frogs who have held the Friday slot at the Lily Pad Club for six summers running. The bassist walks, the drummer brushes, and the saxophonist holds the last note until the bullfrogs answer from the far bank. Recorded in one night, no overdubs.";

const entry = `${TITLE}\n\n${BLURB}`;

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", entry, "utf8");

const back = fs.readFileSync("/output/entry.txt", "utf8");
const chars = [...back].length;
if (chars < 1 || chars > 400) {
  throw new Error(`gate failed: entry is ${chars} characters, must be 1-400`);
}
if (back.trim().length === 0) {
  throw new Error("gate failed: entry is only whitespace");
}
if (back !== entry) {
  throw new Error("gate failed: written entry does not match the entry text");
}
const lines = back.split("\n");
if (lines[0] !== TITLE) {
  throw new Error("structure failed: first line is not the title");
}
if (lines[1] !== "") {
  throw new Error("structure failed: second line is not blank");
}
if (lines.slice(2).join("\n") !== BLURB) {
  throw new Error("structure failed: blurb does not follow the title");
}
console.log(`entry ok: ${chars} characters`);
