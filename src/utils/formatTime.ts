import type { TimeObject } from "../types/timer";

export function formatTime(seconds: number): string {
    const remainingHours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hh = String(remainingHours);
    const mm = String(remainingMinutes).padStart(2, '0');
    const ss = String(remainingSeconds).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}
export function durationToTimeObject(duration: number): TimeObject {
    const hh = Math.floor(duration / 3600)
    const mm = Math.floor((duration % 3600) / 60)
    const ss = duration % 60
    return {
        hh: String(hh).padStart(2, '0'),
        mm: String(mm).padStart(2, '0'),
        ss: String(ss).padStart(2, '0')
    }
}

export function timeObjectToDuration(time: TimeObject): number {
    return parseInt(time.hh) * 3600 + parseInt(time.mm) * 60 + parseInt(time.ss)
}