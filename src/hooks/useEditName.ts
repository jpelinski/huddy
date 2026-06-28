import { useState } from "react";
import { useTimerStore } from "../store/timerStore";

export function useEditName(timerId: string) {
    const maxLength: number = 16
    const { updateTimer } = useTimerStore()
    const name = useTimerStore((state) => state.timers.find((t) => t.id === timerId)?.name ?? '')
    const [editing, setEditing] = useState(false)
    const [updatedName, setUpdatedName] = useState('')


    const editingStart = () => {
        setUpdatedName(name)
        setEditing(true)
    }
    const save = () => {
        updateTimer(timerId, { name: updatedName.trim().slice(0, maxLength) || name })
        setEditing(false)
    }
    const cancel = () => setEditing(false)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') save()
        if (e.key === 'Escape') cancel()
        if (updatedName.length >= maxLength && e.key !== 'Backspace' && e.key !== 'Escape' && e.key !== 'Enter') return
    }
    return {
        editing, updatedName, setUpdatedName, handlers: { editingStart, save, cancel, handleKeyDown }
    }
}