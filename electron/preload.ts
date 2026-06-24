import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
    drag: (delta: { x: number, y: number }) => ipcRenderer.send('window-drag', delta),
    close: () => ipcRenderer.invoke('window-close'),
    minimize: () => ipcRenderer.invoke('window-minimize'),
})
