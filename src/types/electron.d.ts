export interface ElectronAPI {
    drag: (delta: { x: number; y: number }) => void;
    minimize: () => Promise<void>;
    close: () => Promise<void>;
}
declare global {
    interface Window {
        api: ElectronAPI;
    }
}