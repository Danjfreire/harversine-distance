import { haversineDistance } from "./harversine-distance.mjs";
import { parseJson } from "./json-parser.mjs";
import { readFileSync } from "node:fs"
import { Profiler } from "./profiler.mjs";

const profiler = new Profiler();

profiler.start();

profiler.time("input");
const input = readFileSync("./input.json", { encoding: 'utf-8' });
profiler.timeEnd("input");

profiler.time("parse");
const parsedInput = parseJson(input);
profiler.timeEnd("parse");

profiler.time("distance-calc");
let distanceAccumulator = 0;
for (const coords of parsedInput.coordinates) {
    let { x0, y0, x1, y1 } = coords;
    distanceAccumulator += haversineDistance(x0, y0, x1, y1);
}
profiler.timeEnd("distance-calc");

profiler.time("output");
console.log("Average :" + distanceAccumulator / parsedInput.coordinates.length);
console.log("-------------------------------------")
profiler.timeEnd("output");

profiler.stopAndPrint();
