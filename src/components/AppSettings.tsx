import { useState } from "react";
import { useProcessMonitor } from "../hooks/useProcessMonitor";
import styles from "./AppSettings.module.css";
import btnStyles from "../styles/buttons.module.css";
import { useUIStore } from "../store/UIStore";

export function AppSettings() {
  const { monitoredProcess, setMonitoredProcess } = useUIStore();
  const [inputValue, setInputValue] = useState("BlackDesert64.exe");
  const { isRunning } = useProcessMonitor(monitoredProcess);

  const handleSubmit = () => {
    setMonitoredProcess(inputValue.trim() || null);
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
        {monitoredProcess && (
          <div className={styles.status}>
            <div className={styles.dot} data-running={isRunning}>
              {" "}
            </div>
            <span>
              {" "}
              {monitoredProcess} - {isRunning ? "Running" : "Not Found"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
