import { create } from 'zustand'

interface MonitorStore {
    processName: string | null
    isRunning: boolean
    isConnected: boolean
    setProcessName: (name: string | null) => void
    setStatus: (isRunning: boolean, isConnected: boolean) => void
}

export const useMonitorStore = create<MonitorStore>((set) => ({
    processName: null,
    isRunning: false,
    isConnected: false,
    setProcessName: (name) => set({ processName: name }),
    setStatus: (isRunning, isConnected) => set({ isRunning, isConnected }),
}))