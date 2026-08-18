import { MonitorCheckIcon, NetworkIcon } from "lucide-react";
import styles from "./Monitor.module.css";
import { useMonitorStore } from "../store/monitorStore";

export function Monitor() {
  const { isRunning, isConnected } = useMonitorStore();

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
