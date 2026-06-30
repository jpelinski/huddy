export interface ElectronAPI {
    drag: (delta: { x: number; y: number }) => void;
    minimize: () => Promise<void>;
    close: () => Promise<void>;
    setHeight: (height: number) => void
    storeGet: (key: string) => Promise<unknown>
    storeSet: (key: string, value: unknown) => Promise<void>
}
declare global {
    interface Window {
        api: ElectronAPI;
    }
}