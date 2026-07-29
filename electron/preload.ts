import { contextBridge, ipcRenderer } from 'electron'
import { isCryptoKey } from 'util/types'

contextBridge.exposeInMainWorld('api', {
    drag: (delta: { x: number, y: number }) => ipcRenderer.send('window-drag', delta),
    close: () => ipcRenderer.invoke('window-close'),
    minimize: () => ipcRenderer.invoke('window-minimize'),
    setHeight: (height: number) => ipcRenderer.send('set-height', height),
    storeGet: (key: string) => ipcRenderer.invoke('store-get', key),
    storeSet: (key: string, value: unknown) => ipcRenderer.invoke('store-set', key, value),
    startMonitor: (processName: string) => ipcRenderer.invoke('start-monitor', processName),
    stopMonitor: () => ipcRenderer.invoke('stop-monitor'),
    onMonitorUpdate: (callback: (data: { isRunning: boolean }) => void) => {
        ipcRenderer.on('monitor-update', (_event, data) => callback(data))
        return () => ipcRenderer.removeAllListeners('monitor-update')
    }
})
