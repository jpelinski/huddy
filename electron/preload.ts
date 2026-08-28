import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    drag: (delta: { x: number, y: number }) => ipcRenderer.send('window-drag', delta),
    close: () => ipcRenderer.invoke('window-close'),
    minimize: () => ipcRenderer.invoke('window-minimize'),
    setHeight: (height: number) => ipcRenderer.send('set-height', height),
    menuSetSize: (width: number, height: number) => ipcRenderer.send('menu-set-size', width, height),

    storeGet: (key: string) => ipcRenderer.invoke('store-get', key),
    storeSet: (key: string, value: unknown) => ipcRenderer.invoke('store-set', key, value),
    startMonitor: (processName: string) => ipcRenderer.invoke('start-monitor', processName),
    stopMonitor: () => ipcRenderer.invoke('stop-monitor'),
    onMonitorUpdate: (callback: (data: { type: 'process', isRunning: boolean } | { type: 'network', isConnected: boolean }) => void) => {
        ipcRenderer.on('monitor-update', (_event, data) => callback(data))
        return () => ipcRenderer.removeAllListeners('monitor-update')
    },
    onUpdateAvailable: (callback: () => void) => {
        ipcRenderer.on('update-available', callback)
        return () => ipcRenderer.removeAllListeners('update-available')
    },
    onUpdateDownloaded: (callback: () => void) => {
        ipcRenderer.on('update-downloaded', callback)
        return () => ipcRenderer.removeAllListeners('update-downloaded')
    },
    installUpdate: () => ipcRenderer.send('install-update'),
    setUIState: (patch: Record<string, unknown>) => ipcRenderer.send('set-ui-state', patch),
    onUIState: (callback: (state: Record<string, unknown>) => void) => {
        ipcRenderer.on('ui-state', (_event, state) => callback(state))
        return () => ipcRenderer.removeAllListeners('ui-state')
    }
})
