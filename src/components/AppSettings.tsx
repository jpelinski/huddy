import { useState } from "react";
import { useProcessMonitor } from "../hooks/useProcessMonitor";
import styles from "./AppSettings.module.css";
import btnStyles from "../styles/buttons.module.css";

export function AppSettings() {
  const [processName, setProcessName] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("BlackDesert64.exe");
  const { isRunning } = useProcessMonitor(processName);

  const handleSubmit = () => {
    setProcessName(inputValue.trim() || null);
  };
  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <span className={styles.label}>Process Monitor</span>
        <div className={styles.row}>
          <input
            className={styles.input}
            value={inputValue}
            onDoubleClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button className={btnStyles.btn} onClick={handleSubmit}>
            Apply
          </button>
        </div>
        {processName && (
          <div className={styles.status}>
            <div className={styles.dot} data-running={isRunning}>
              {" "}
            </div>
            <span>
              {" "}
              {processName} - {isRunning ? "Running" : "Not Found"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
