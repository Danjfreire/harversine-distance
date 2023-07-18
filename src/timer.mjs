import { rdtsc } from "rdtsc";

export function getOsTimerFrequency() {
    return 1000000;
}

export function readOsTimer() {
    const timeOfDayInSeconds = Date.now() / 1000;
    const OsTimer = getOsTimerFrequency() * timeOfDayInSeconds;
    return OsTimer;
}

export function readCPUtimer() {
    return rdtsc();
}

export function estimateCPUtimerFreq() {
    const millisTowait = 100;

    let osFreq = getOsTimerFrequency();
    
    let cpuStart = readCPUtimer();
    let osStart = readOsTimer();
    let osEnd = 0;
    let osElapsed = 0;
    let osWaitTime = osFreq * millisTowait / 1000;

    while (osElapsed < osWaitTime) {
        osEnd = readOsTimer();
        osElapsed = osEnd - osStart;
    }

    let cpuEnd = readCPUtimer();
    let cpuElapsed = cpuEnd - cpuStart;
    let cpuFreq = BigInt(osFreq) * cpuElapsed / BigInt(osElapsed);

    return cpuFreq;
}
