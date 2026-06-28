import { useState } from "react";
import { useTimerStore } from "../store/timerStore";

export function useEditName(timerId: string) {
    const maxLength: number = 16
    const { updateTimer } = useTimerStore()
    const name = useTimerStore((state) => state.timers.find((t) => t.id === timerId)?.name ?? '')
    const [editing, setEditing] = useState(false)
    const [newName, setNewName] = useState('')


    const editingStart = () => {
        setNewName(name)
        setEditing(true)
    }
    const save = () => {
        updateTimer(timerId, { name: newName.trim().slice(0, maxLength) || name })
        setEditing(false)
    }
    const cancel = () => setEditing(false)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') save()
        if (e.key === 'Escape') cancel()
        if (newName.length >= maxLength && e.key !== 'Backspace' && e.key !== 'Escape' && e.key !== 'Enter') return
    }
    return {
        editing, newName, setNewName, handlers: { editingStart, save, cancel, handleKeyDown }
    }
}