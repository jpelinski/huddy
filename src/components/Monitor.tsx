import { MonitorCheckIcon, NetworkIcon } from "lucide-react";
import { useProcessMonitor } from "../hooks/useProcessMonitor";
import { useUIStore } from "../store/UIStore";
import styles from "./Monitor.module.css";

export function Monitor() {
  const { monitoredProcess } = useUIStore();
  const { isRunning, isConnected } = useProcessMonitor(monitoredProcess);

  return (
    <div>
      <div className={styles.indicators}>
        <span
          className={styles.dot}
          data-active={isRunning}
          style={{ color: `${isRunning ? "green" : "red"}` }}
          title="Process"
        >
          <MonitorCheckIcon size={14} />
        </span>
        <span className={styles.dot} data-active={isConnected} title="Connection">
          <NetworkIcon size={14} color={isConnected ? "green" : "red"} />
        </span>
      </div>
    </div>
  );
}
