import { useState, useEffect } from 'react'

interface ClockOptions {
    format24h: boolean
    showSeconds: boolean
}

export function useClock({ format24h = true, showSeconds = true }: Partial<ClockOptions> = {}) {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const hours = format24h ? time.getHours() : time.getHours() % 12 || 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    const formattedTime = [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        ...(showSeconds ? [String(seconds).padStart(2, '0')] : []),].join(':')

    return { formattedTime, time }


}