import { haversineDistance } from "./harversine-distance.mjs";
import { parseJson } from "./json-parser.mjs";
import { readFileSync } from "node:fs"
import { estimateCPUtimerFreq, readCPUtimer } from "./timer.mjs";

console.time("Total (console.time)");
const start = performance.now();
const profileStart = readCPUtimer();

const inputStart = readCPUtimer();
const input = readFileSync("./input.json", { encoding: 'utf-8' });
const inputEnd = readCPUtimer();

const parseStart = readCPUtimer();
const parsedInput = parseJson(input);
const parseEnd = readCPUtimer();

const distanceStart = readCPUtimer();
let distanceAccumulator = 0;
for (const coords of parsedInput.coordinates) {
    let { x0, y0, x1, y1 } = coords;
    distanceAccumulator += haversineDistance(x0, y0, x1, y1);
}
const distanceEnd = readCPUtimer();

const outputStart = readCPUtimer();
console.log("Average :" + distanceAccumulator / parsedInput.coordinates.length);
console.log("-------------------------------------")
const outputEnd = readCPUtimer();


console.timeEnd("Total (console.time)");
const end = performance.now();
const profileEnd = readCPUtimer();


const perfTotal = end - start;
const total = profileEnd - profileStart;
const cpuFreq = estimateCPUtimerFreq();

console.log(`Total (peformance) : ${perfTotal} ms`);
console.log(`Total (RDTSC): ${total} (${(BigInt(1000) * total / cpuFreq)} ms)`);

console.log("-------------------------------------");

logTimeElapsed("Input", total, inputStart, inputEnd);
logTimeElapsed("Parse", total, parseStart, parseEnd);
logTimeElapsed("Distance", total, distanceStart, distanceEnd);
logTimeElapsed("Output", total, outputStart, outputEnd);

function logTimeElapsed(step, total, start, end) {
    const percent = BigInt(100) * (end - start) / total ;
    console.log(`${step} : ${end-start} (${percent}%)`);
}