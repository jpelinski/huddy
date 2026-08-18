import { useEffect } from "react";
import { useMonitorStore } from "../store/monitorStore";

export function useProcessMonitor() {
    const { processName } = useMonitorStore()

    useEffect(() => {
        if (!processName) return

        window.api.startMonitor(processName)

        const cleanup = window.api.onMonitorUpdate((update) => {

            if (update.type === 'process') {
                useMonitorStore.getState().setStatus(update.isRunning, useMonitorStore.getState().isConnected)
            }
            if (update.type === 'network') {
                useMonitorStore.getState().setStatus(useMonitorStore.getState().isRunning, update.isConnected)
            }
        })

        return () => {
            cleanup()
            window.api.stopMonitor()
        }
    }, [processName])
}