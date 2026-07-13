import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTimerStore } from './timerStore'

Object.defineProperty(window, 'api', {
    value: {
        storeGet: vi.fn().mockResolvedValue(null),
        storeSet: vi.fn().mockResolvedValue(undefined),
    },
    writable: true,
})



beforeEach(() => {
    useTimerStore.setState({ timers: [], presets: [] })
})

describe('addTimer', () => {
    it('should add a new timer to the store', () => {
        const { addTimer } = useTimerStore.getState();
        addTimer({ name: 'Test Timer', duration: 60 });
        const { timers } = useTimerStore.getState();
        expect(timers.length).toBe(1);
        expect(timers[0].name).toBe('Test Timer');
        expect(timers[0].duration).toBe(60);
        expect(timers[0].duration).toBe(60);
        expect(timers[0].isFinished).toBe(false);
        expect(timers[0].isRunning).toBe(false);
    });
});

describe('removeTimer', () => {
    it('should remove a timer from the store', () => {
        const { addTimer, removeTimer } = useTimerStore.getState();
        addTimer({ name: 'Test Timer', duration: 60 });
        const timerId = useTimerStore.getState().timers[0].id;
        expect(useTimerStore.getState().timers.length).toBe(1);
        removeTimer(timerId);
        expect(useTimerStore.getState().timers.length).toBe(0);
    });
})

describe('toggleTimer', () => {
    it('should toggle the isRunning state of a timer', () => {
        const { addTimer, toggleTimer } = useTimerStore.getState();
        addTimer({ name: 'Test Timer', duration: 60 });
        const timerId = useTimerStore.getState().timers[0].id;
        expect(useTimerStore.getState().timers[0].isRunning).toBe(false);
        toggleTimer(timerId);
        expect(useTimerStore.getState().timers[0].isRunning).toBe(true);
        toggleTimer(timerId);
        expect(useTimerStore.getState().timers[0].isRunning).toBe(false);
    });
    it('should not toggle a finished timer', () => {
        const { addTimer, toggleTimer } = useTimerStore.getState();
        addTimer({ name: 'Test Timer', duration: 60 });
        const timerId = useTimerStore.getState().timers[0].id; useTimerStore.getState().timers[0].remainingTime = 0;
        useTimerStore.getState().timers[0].isFinished = true;
        expect(useTimerStore.getState().timers[0].isRunning).toBe(false);
        toggleTimer(timerId);
        expect(useTimerStore.getState().timers[0].isRunning).toBe(false);
    });
});

describe('resetTimer', () => {
    it('should reset the timer to its original duration and stop it', () => {
        const { addTimer, resetTimer } = useTimerStore.getState();
        addTimer({ name: 'Test Timer', duration: 60 });
        const timerId = useTimerStore.getState().timers[0].id;
        useTimerStore.getState().timers[0].remainingTime = 30;
        useTimerStore.getState().timers[0].isRunning = true;
        resetTimer(timerId);
        expect(useTimerStore.getState().timers[0].remainingTime).toBe(60);
        expect(useTimerStore.getState().timers[0].isRunning).toBe(false);
    })
})

describe('tickTimer', () => {
    it('should decrement the timer duration by 1 second', () => {
        const { addTimer, tickTimer } = useTimerStore.getState();
        addTimer({ name: 'Test Timer', duration: 60 });
        const timerId = useTimerStore.getState().timers[0].id;
        useTimerStore.getState().timers[0].isRunning = true;
        tickTimer(timerId);
        expect(useTimerStore.getState().timers[0].remainingTime).toBe(59);
    });

    it('should mark the timer as finished when duration reaches 0', () => {
        const { addTimer, tickTimer } = useTimerStore.getState();
        addTimer({ name: 'Test Timer', duration: 1 });
        const timerId = useTimerStore.getState().timers[0].id;
        useTimerStore.getState().timers[0].isRunning = true;
        tickTimer(timerId);
        expect(useTimerStore.getState().timers[0].remainingTime).toBe(0);
        expect(useTimerStore.getState().timers[0].isFinished).toBe(true);
    });
});


