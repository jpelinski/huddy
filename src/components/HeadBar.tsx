import styles from "./HeadBar.module.css";

interface Props {
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onAddTimer: () => void;
}
export function HeadBar({ onDoubleClick, onAddTimer }: Props) {
  return (
    <div className={styles.headbar} onDoubleClick={onDoubleClick}>
      <button onClick={onAddTimer}>+</button>
      <div className={styles.headbar__title}>Huddy</div>
      <button onClick={() => window.api.minimize()}>-</button>
      <button onClick={() => window.api.close()}>x</button>
    </div>
  );
}
