import {rdtsc} from "rdtsc";
import { estimateCPUtimerFreq } from "./timer-utils.mjs";

export class Profiler {

    startTime;
    stopTime;
    operationStarts = {};
    operationStops = {};

    start(){
        this.startTime = rdtsc();
    }

    stopAndPrint(){
        this.stopTime = rdtsc();
        
        const cpuFreq = estimateCPUtimerFreq();
        
        const totalTime = this.stopTime - this.startTime;

        console.log(`Total (RDTSC): ${totalTime} (${(BigInt(1000) * totalTime / cpuFreq)} ms)`);
        for (const operation in this.operationStarts) {
            const start = this.operationStarts[operation];
            const end = this.operationStops[operation];

            if(!end) {
                continue;
            };

            const total = end - start;
            const percent = BigInt(100) * total / totalTime ;
            console.log(`${operation} : ${(BigInt(1000) * total / cpuFreq)}ms (${percent}%)`);
        }
    }

    reset(){
        this.startTime = undefined;
        this.stopTime = undefined;
        this.operationStarts = {};
        this.operationStops = {};
    }

    time(operation){
        if(this.startTime === undefined){
            this.start();
        }

        if(this.operationStarts[operation] === undefined){
            this.operationStarts[operation] = rdtsc();
        }
    }

    timeEnd(operation){
        if(this.operationStops[operation] === undefined){
            this.operationStops[operation] = rdtsc();
        }
    }

}