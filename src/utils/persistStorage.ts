import type { StateStorage } from "zustand/middleware";

export const persistStorage: StateStorage = {
    getItem: async (name) => {
        const value = await window.api.storeGet(name)
        return value ? JSON.stringify(value) : null
    },
    setItem: async (name, value) => {
        await window.api.storeSet(name, JSON.parse(value))
    },
    removeItem: async (name) => {
        await window.api.storeSet(name, undefined)
    }
}