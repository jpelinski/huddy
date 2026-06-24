export interface Preset {
    id: string;
    name: string;
    duration: number; // in seconds
}
export interface Timer extends Preset {
    id: string;
    remainingTime: number; // in seconds
    isRunning: boolean;
    isFinished?: boolean;
}