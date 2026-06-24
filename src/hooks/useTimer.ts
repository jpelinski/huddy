import { useEffect } from "react";
import { useTimerStore } from "../store/timerStore";

export const useTimer = (id: string) => {
    const { timers, tickTimer } = useTimerStore();
    const timer = timers.find(timer => timer.id === id);

    useEffect(() => {
        if (!timer || !timer.isRunning) return;

        const interval = setInterval(() => {
            tickTimer(id);
        }, 1000);

        return () => clearInterval(interval)
    }, [timer?.isRunning, id])
}