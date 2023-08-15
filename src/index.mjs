import { haversineDistance } from "./harversine-distance.mjs";
import { parseJson } from "./json-parser.mjs";
import { readFileSync } from "node:fs"
import { Profiler } from "./profiler.mjs";


Profiler.start();

Profiler.time("input");
const input = readFileSync("./input.json", { encoding: 'utf-8' });
Profiler.timeEnd("input");

Profiler.time("parse");
const parsedInput = parseJson(input);
Profiler.timeEnd("parse");

Profiler.time("distance-calc");
let distanceAccumulator = 0;
for (const coords of parsedInput.coordinates) {
    let { x0, y0, x1, y1 } = coords;
    distanceAccumulator += haversineDistance(x0, y0, x1, y1);
}
Profiler.timeEnd("distance-calc");

Profiler.time("output");
console.log("Average :" + distanceAccumulator / parsedInput.coordinates.length);
console.log("-------------------------------------")
Profiler.timeEnd("output");

Profiler.stopAndPrint();
