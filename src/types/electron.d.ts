export interface ElectronAPI {
    drag: (delta: { x: number; y: number }) => void;
    minimize: () => Promise<void>;
    close: () => Promise<void>;
    setHeight: (height: number) => void
    storeGet: (key: string) => Promise<unknown>
    storeSet: (key: string, value: unknown) => Promise<void>
    startMonitor: (processName: string) => Promise<void>
    stopMonitor: () => Promise<void>
    onMonitorUpdate: (callback: (data: { type: 'process', isRunning: boolean } | { type: 'network', isConnected: boolean }) => void) => () => void
}
declare global {
    interface Window {
        api: ElectronAPI;
    }
}