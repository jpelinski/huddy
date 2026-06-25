import { Minus, Plus, X } from "lucide-react";
import styles from "./HeadBar.module.css";

interface Props {
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onAddTimer: () => void;
}
export function HeadBar({ onDoubleClick, onAddTimer }: Props) {
  return (
    <div className={styles.headbar} onDoubleClick={onDoubleClick}>
      <button className={styles.btn} onClick={onAddTimer}>
        <Plus size={14} />
      </button>
      <div className={styles.headbar__title}>Huddy</div>
      <button className={styles.btn} onClick={() => window.api.minimize()}>
        <Minus size={14} />
      </button>
      <button
        className={`${styles.btn} ${styles.btnClose}`}
        onClick={() => window.api.close()}
      >
        <X size={14} />
      </button>
    </div>
  );
}
