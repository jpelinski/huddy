import { useTimerStore } from "../store/timerStore";
import { TimerDisplay } from "./TimerDisplay";

interface Props {
  isExpanded: boolean;
}

export function TimerList({ isExpanded }: Props) {
  const { timers, toggleTimer } = useTimerStore();

  return (
    <div>
      {timers.map((timer) => (
        <div key={timer.id}>
          <TimerDisplay timerId={timer.id} />
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTimer(timer.id);
              }}
            >
              {timer.isRunning ? "Pause" : "Start"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
