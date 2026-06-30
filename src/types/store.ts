import type { Timer, Preset } from "./timer";

export interface PresistedState {
    timers: Timer[]
    presets: Preset[]
}
