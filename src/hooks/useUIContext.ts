import { useContext } from "react";
import { UIContext } from "../context/UIContext";

export function useUIContext() {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUIConctext need to be only used inside UIProvider");
    return context;
}