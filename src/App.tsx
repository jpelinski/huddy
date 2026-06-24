import { TimerDisplay } from "./components/TimerDisplay";
import { useTimerStore } from "./store/timerStore";

function App() {
  const { addTimer, toggleTimer, timers } = useTimerStore();

  return (
    <div>
      <button onClick={() => addTimer({ name: "New Timer", duration: 10 })}>
        Add Timer
      </button>
      {timers.map((timer) => (
        <div key={timer.id}>
          <TimerDisplay timerId={timer.id} />
          <button onClick={() => toggleTimer(timer.id)}>
            {timer.isRunning ? "Pause" : "Start"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
