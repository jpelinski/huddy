import { useState, useRef } from 'react'
import { useTimerStore } from '../store/timerStore'
import type { TimeObject } from '../types/timer';
import { durationToTimeObject, timeObjectToDuration } from '../utils/formatTime';



export function useEditTime(timerId: string) {
    const { updateTimer } = useTimerStore();
    const [editing, setEditing] = useState(false);
    const [time, setTime] = useState<TimeObject>({ hh: '00', mm: "00", ss: '00' })
    const [touched, setTouched] = useState<keyof TimeObject | null>(null)

    const hhRef = useRef<HTMLInputElement>(null)
    const mmRef = useRef<HTMLInputElement>(null)
    const ssRef = useRef<HTMLInputElement>(null)

    const editingStart = (currentDuration: number) => {
        setTime(durationToTimeObject(currentDuration))
        setEditing(true)
    }
    const saveTime = () => {
        const duration = timeObjectToDuration(time)
        if (duration > 0) {
            updateTimer(timerId, { duration, remainingTime: duration })
        }
        setEditing(false)
    }

    const cancel = () => {
        setEditing(false)
    }
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        segment: keyof TimeObject,
        nextRef?: React.RefObject<HTMLInputElement | null>,
        prevRef?: React.RefObject<HTMLInputElement | null>
    ) => {
        if (e.key === 'Enter') { saveTime(); return }
        if (e.key === 'Escape') { cancel(); return }
        if (e.key === 'ArrowRight' && nextRef) { nextRef.current?.focus(); return }
        if (e.key === 'ArrowLeft' && prevRef) { prevRef.current?.focus(); return }
        if (e.key === 'Backspace') {
            setTime((prev) => ({ ...prev, [segment]: '00' }))
            return
        }
        if (!/[0-9]/.test(e.key)) return

        e.preventDefault()

        if (touched !== segment) {
            setTime((prev) => ({ ...prev, [segment]: '0' + e.key }))
            setTouched(segment)
            return
        }
        const newDigits = (time[segment] + e.key).slice(-2)

        if ((segment === 'mm' || segment === 'ss') && parseInt(newDigits) > 59) return

        setTime((prev) => ({ ...prev, [segment]: newDigits }))
        if (nextRef) nextRef.current?.focus()
        setTouched(null)
    }
    return {
        editing, time, refs: { hhRef, mmRef, ssRef },
        handlers: { editingStart, saveTime, cancel, handleKeyDown }
    }
}