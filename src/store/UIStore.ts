import { create } from "zustand";

interface UIStore {
    isExpanded: boolean;
    toggleExpanded: () => void;
    setIsExpanded: (value: boolean) => void;
    openSettingsId: string | null;
    setOpenSettingsId: (id: string | null) => void;
    clockVisible: boolean;
    setClockVisible: (value: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
    isExpanded: true,
    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
    setIsExpanded: (value: boolean) => set(() => ({ isExpanded: value })),
    openSettingsId: null,
    setOpenSettingsId: (id: string | null) => set(() => ({ openSettingsId: id })),
    clockVisible: false,
    setClockVisible: (value: boolean) => set(() => ({ clockVisible: value }))
}));