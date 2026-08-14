import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from "electron";
import path from "path";
import Store from 'electron-store'
import si from 'systeminformation'
import fs from 'fs'

const store = new Store({ clearInvalidConfig: true })
const logPath = path.join(app.getPath('userData'), 'network-log.txt')
const writeLog = (data: unknown) => {
    const timestamp = new Date().toISOString()
    const header = `\n[${timestamp}]\n`

    if (typeof data === 'object' && data !== null && 'filteredConnections' in data) {
        const { filteredConnections, ...rest } = data as { filteredConnections: unknown[], [key: string]: unknown }
        let log = header
        log += `type: ${rest.type} | isConnected: ${rest.isConnected} | count: ${rest.currentCount}\n`
        log += `connections:\n`
        filteredConnections.forEach((c: unknown) => {
            const connection = c as { localAddress: string, localPort: number, peerAddress: string, peerPort: number, state: string, pid: number }
            log += ` ${connection.localAddress}:${connection.localPort} -> ${connection.peerAddress}:${connection.peerPort} | ${connection.state} | pid: ${connection.pid}\n`
        })
        fs.appendFileSync(logPath, log)

    } else {

        fs.appendFileSync(logPath, header + JSON.stringify(data, null, 2) + '\n')
    }
}

let win: BrowserWindow | null = null;

function createWindow() {
    win = new BrowserWindow({
        width: 300,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: true,
        skipTaskbar: false,
        ...(process.platform === 'darwin' && {
            vibrancy: 'hud',
            visualEffectState: 'active',
        }),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    win.setAlwaysOnTop(true, 'screen-saver')
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

    win.on('resize', () => win?.webContents.invalidate())

    if (!app.isPackaged) {
        win.loadURL("http://localhost:5173");
        // win.webContents.openDevTools()
    } else {
        win.loadFile(path.join(__dirname, "../../dist/index.html"));
    }
}

let tray: Tray | null = null

function createTray() {
    const icon = nativeImage.createFromPath(
        path.join(__dirname, '../../src/assets/tray-icon.jpg')
    )

    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show', click: () => win?.show() },
        { type: 'separator' },
        { label: 'Quit', click: () => app.quit() },
    ])

    tray.setToolTip('Huddy')
    tray.setContextMenu(contextMenu)
}



app.whenReady().then(() => {
    createWindow();
    createTray()
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on('window-drag', (_event, delta: { x: number, y: number }) => {
    if (!win) return
    const [x, y] = win.getPosition()
    win.setPosition(x + delta.x, y + delta.y)
});
ipcMain.handle('window-close', () => {
    if (win) {
        win.close();
    }
});
ipcMain.handle('window-minimize', () => {
    win?.hide()
});

ipcMain.on('set-height', (_event, height: number) => {
    if (!win) return
    const [width] = win.getSize()
    win.setSize(width, height)
})

ipcMain.handle('store-get', (_event, key: string) => {
    return store.get(key)
})
ipcMain.handle('store-set', (_event, key: string, value: unknown) => {
    store.set(key, value)
})

let processInterval: NodeJS.Timeout | null = null
let networkInterval: NodeJS.Timeout | null = null
let lastConnectionCount: number | null = null
let lastConnectionStates: string[] = []
let currentPid: number | null = null
ipcMain.handle('start-monitor', async (_event, processName: string) => {
    if (processInterval) clearInterval(processInterval)
    if (networkInterval) clearInterval(networkInterval)



    processInterval = setInterval(async () => {
        const processes = await si.processes()
        const found = processes.list.find(p => p.name.includes(processName))
        const isRunning = Boolean(found)
        currentPid = found ? found.pid : null

        win?.webContents.send('monitor-update', { type: 'process', isRunning })
    }, 3000)

    networkInterval = setInterval(async () => {
        if (!currentPid) {
            win?.webContents.send("monitor-update", { type: "network", isConnected: false })
            return
        }
        const connections = await si.networkConnections()
        const filteredConnections = connections.filter(c => c.pid === currentPid)
        const isConnected = filteredConnections.length > 0

        const currentCount = filteredConnections.length
        const currentStates = filteredConnections.map(c => c.state)

        const countChanged = currentCount !== lastConnectionCount
        const statesChanged = currentStates.length !== lastConnectionStates.length ||
            currentStates.some((state, i) => state !== lastConnectionStates[i])

        if (countChanged || statesChanged) {
            writeLog({ type: "network", isConnected, currentCount, filteredConnections })
            lastConnectionCount = currentCount
            lastConnectionStates = currentStates
        }

        win?.webContents.send("monitor-update", { type: "network", isConnected })

    }, 1000)
})

ipcMain.handle('stop-monitor', () => {
    if (processInterval) { clearInterval(processInterval); processInterval = null }
    if (networkInterval) { clearInterval(networkInterval); networkInterval = null }
    currentPid = null
    lastConnectionCount = null
    lastConnectionStates = []

})