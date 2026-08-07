import { useEffect, useState } from "react";
interface MonitorData {
    isRunning: boolean
    isConnected: boolean
}

export function useProcessMonitor(processName: string | null) {
    const [data, setData] = useState<MonitorData>({ isRunning: false, isConnected: false })

    useEffect(() => {
        if (!processName) return
        window.api.startMonitor(processName)

        const cleanup = window.api.onMonitorUpdate((update) => {

            if (update.type === 'process') {
                setData((prev) => ({ ...prev, isRunning: update.isRunning }))
            }
            if (update.type === 'network') {
                setData((prev) => ({ ...prev, isConnected: update.isConnected }))
            }
        })

        return () => {
            cleanup()
            window.api.stopMonitor()
        }
    }, [processName])
    return data
}