import { writeFile } from "node:fs";
import { haversineDistance } from "./harversine-distance.mjs";

if (process.argv.length < 3) {
    console.log('Usage: node input-generator.mjs <number>')
    process.exit(1)
}

function generateInput(number) {
    const xRange = 180;
    const yRange = 90;
    let distanceAccumulator = 0;

    let x0;
    let y0;
    let x1;
    let y1;

    let coordinates = [];

    for (let i = 0; i < number; i++) {
        x0 = Math.random() * (xRange - (-xRange)) + (-xRange);
        y0 = Math.random() * (yRange - (-yRange)) + (-yRange);
        x1 = Math.random() * (xRange - (-xRange)) + (-xRange);
        y1 = Math.random() * (yRange - (-yRange)) + (-yRange);

        coordinates.push({ x0, y0, x1, y1 });
        distanceAccumulator += haversineDistance(x0, y0, x1, y1);
    }

    console.log("Average :" + distanceAccumulator / number);
    writeFile("input.json", JSON.stringify({ coordinates }), "utf8", () => { });
}

const inputSize = parseInt(process.argv[2])
generateInput(inputSize);