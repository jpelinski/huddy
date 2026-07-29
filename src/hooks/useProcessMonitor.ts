import { useEffect, useState } from "react";
interface MonitorData {
    isRunning: boolean
}

export function useProcessMonitor(processName: string | null) {
    const [data, setData] = useState<MonitorData>({ isRunning: false })

    useEffect(() => {
        if (!processName) return
        window.api.startMonitor(processName)

        const cleanup = window.api.onMonitorUpdate(
            (newData) => setData(newData)
        )

        return () => {
            cleanup()
            window.api.stopMonitor()
        }
    }, [processName])
    return data
}