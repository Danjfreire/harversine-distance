import {rdtsc} from "rdtsc";
import { estimateCPUtimerFreq } from "./timer-utils.mjs";

export class Profiler {

    static startTime;
    static stopTime;
    static operationStarts = {};
    static operationStops = {};

    static start(){
        this.startTime = rdtsc();
    }

    static stopAndPrint(){
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

    static reset(){
        this.startTime = undefined;
        this.stopTime = undefined;
        this.operationStarts = {};
        this.operationStops = {};
    }

    static time(operation){
        if(this.startTime === undefined){
            this.start();
        }

        if(this.operationStarts[operation] === undefined){
            this.operationStarts[operation] = rdtsc();
        }
    }

    static timeEnd(operation){
        if(this.operationStops[operation] === undefined){
            this.operationStops[operation] = rdtsc();
        }
    }

}