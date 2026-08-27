import { useEffect, useState } from "react";
import type { SharedUIState } from "../types/uiState";


const defaultState: SharedUIState = {
    clockVisible: true,
    settingsOpen: false
}
export function useSharedUIState() {
    const [state, setState] = useState<SharedUIState>(defaultState);

    useEffect(() => {
        const cleanup = window.api.onUIState((newState) => {
            setState(newState as SharedUIState)
        });
        return cleanup;
    }, []);
    const setUIState = (patch: Partial<SharedUIState>) => {
        window.api.setUIState(patch)
    }
    return { state, setUIState };
}