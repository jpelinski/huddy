import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

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
        win.loadFile(path.join(__dirname, "../dist/index.html"));
    }
}

app.whenReady().then(() => {
    createWindow();
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
    if (win) {
        win.minimize();
    }
});

ipcMain.on('set-height', (_event, height: number) => {
    if (!win) return
    const [width] = win.getSize()
    win.setSize(width, height)
})