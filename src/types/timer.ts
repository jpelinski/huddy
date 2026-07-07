export interface Preset {
    id: string;
    name: string;
    duration: number; // in seconds
    color?: string;

}
export interface Timer extends Preset {
    id: string;
    remainingTime: number; // in seconds
    isRunning: boolean;
    isFinished?: boolean;
}
export interface TimeObject {
    hh: string
    mm: string
    ss: string
}