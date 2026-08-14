import { useAutoUpdater } from "../hooks/useAutoUpdater";
import styles from "./Update.module.css";

export function Update() {
  const { updateAvailable, updateDownloaded, installUpdate } = useAutoUpdater();

  if (!updateAvailable && !updateDownloaded) {
    return null;
  }
  return (
    <div className={styles.notification}>
      {updateDownloaded ? (
        <>
          <span>Update downloaded. </span>
          <button className={styles.btn} onClick={installUpdate}>
            Restart and apply
          </button>
        </>
      ) : (
        <span>Update available. Downloading...</span>
      )}
    </div>
  );
}
