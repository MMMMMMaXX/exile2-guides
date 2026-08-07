#!/usr/bin/env node
// Print key structure of a JSON doc up to a depth, with one example value.
const fs = require("fs");
const d = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const maxDepth = parseInt(process.argv[3] || "4", 10);
function walk(o, p, depth) {
  if (depth > maxDepth) return;
  if (Array.isArray(o)) {
    if (o.length) walk(o[0], p + "[]", depth + 1);
    return;
  }
  if (o && typeof o === "object") {
    for (const k of Object.keys(o)) {
      const v = o[k];
      if (v && typeof v === "object") {
        console.log(
          p + "." + k + " [" + (Array.isArray(v) ? "array" : "obj") + "]",
        );
        walk(v, p + "." + k, depth + 1);
      } else {
        console.log(p + "." + k + " = " + JSON.stringify(v).slice(0, 70));
      }
    }
  }
}
walk(d, "root", 1);
