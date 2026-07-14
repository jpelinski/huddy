import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Timer, Preset } from '../types/timer';
import { persistStorage } from '../utils/persistStorage';

interface TimerStore {
    timers: Timer[];
    presets: Preset[];
    addTimer: (preset: Omit<Preset, 'id'>) => void;
    removeTimer: (id: string) => void;
    toggleTimer: (id: string) => void;
    resetTimer: (id: string) => void;
    tickTimer: (id: string) => void;
    updateTimer: (id: string, update: Partial<Timer>) => void;

    addPreset: (preset: Omit<Preset, 'id'>) => void;
    removePreset: (id: string) => void;
    updatePreset: (id: string, update: Partial<Preset>) => void;
}

export const useTimerStore = create<TimerStore>()(
    persist(
        (set) => ({
            timers: [],
            presets: [],

            addTimer: (preset) => set((state) => ({
                timers: [...state.timers, {
                    ...preset,
                    id: crypto.randomUUID(),
                    remainingTime: preset.duration,
                    isRunning: false,
                    isFinished: false,
                }]
            })),

            removeTimer: (id) => set((state) => ({
                timers: state.timers.filter(timer => timer.id !== id)
            })),

            toggleTimer: (id) => set((state) => ({
                timers: state.timers.map(timer => {
                    if (timer.id === id) {
                        if (timer.isFinished && timer.remainingTime > 0) {
                            return { ...timer, isRunning: !timer.isRunning, isFinished: false };
                        }
                        if (!timer.isFinished) {
                            return { ...timer, isRunning: !timer.isRunning };
                        }
                    }
                    return timer;
                }),
            })),

            resetTimer: (id) => set((state) => ({
                timers: state.timers.map(timer => {
                    if (timer.id === id) {
                        return { ...timer, remainingTime: timer.duration, isRunning: false, isFinished: false };
                    }
                    return timer;
                }),
            })),

            tickTimer: (id) => set((state) => ({
                timers: state.timers.map(timer => {
                    if (timer.id !== id || !timer.isRunning) return timer;

                    const newRemainingTime = Math.max(0, timer.remainingTime - 1);
                    return {
                        ...timer,
                        remainingTime: newRemainingTime,
                        isFinished: newRemainingTime <= 0,
                        isRunning: newRemainingTime > 0 ? timer.isRunning : false,
                    };
                }),
            })),
            updateTimer: (id, update) => set((state) => ({
                timers: state.timers.map(timer => {
                    if (timer.id === id) {
                        return { ...timer, ...update };
                    }
                    return timer;
                }),
            })),

            addPreset: (preset) => set((state) => ({
                presets: [...state.presets, { ...preset, id: crypto.randomUUID() }]
            })),
            removePreset: (id) => set((state) => ({
                presets: state.presets.filter(preset => preset.id !== id)
            })),
            updatePreset: (id, update) => set((state) => ({
                presets: state.presets.map(preset => {
                    if (preset.id === id) {
                        return { ...preset, ...update };
                    }
                    return preset;
                }),
            })),
        }),
        {
            name: 'huddy-storage',
            storage: createJSONStorage(() => persistStorage),
            onRehydrateStorage: () => (_state, error) => {
                if (error) {
                    console.error('Failed to rehudrate store:', error)
                }
            }
        }
    )
)