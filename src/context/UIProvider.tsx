import { useState } from "react";
import { UIContext } from "./UIContext";

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <UIContext.Provider value={{ isExpanded, toggleExpanded }}>
      {children}
    </UIContext.Provider>
  );
}
