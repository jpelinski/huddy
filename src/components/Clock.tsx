import { useClock } from "../hooks/useClock";
import { useProcessMonitor } from "../hooks/useProcessMonitor";
import { useUIStore } from "../store/UIStore";
import styles from "./Clock.module.css";

export function Clock() {
  const { formattedTime } = useClock();
  const { monitoredProcess } = useUIStore();
  const { isRunning, isConnected } = useProcessMonitor(monitoredProcess);

  return (
    <div className={styles.clock}>
      <span className={styles.time}>{formattedTime}</span>
      {monitoredProcess}
      <div className={styles.indicators}>
        <span className={styles.dot} data-active={isRunning} title="Process" />
        <span className={styles.dot} data-active={isConnected} title="Connection" />
      </div>
    </div>
  );
}
