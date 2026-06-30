import { createContext } from "react";

export interface UIContextType {
  isExpanded: boolean;
  toggleExpanded: () => void;
}
export const UIContext = createContext<UIContextType | null>(null);
