import { app, BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

let mainWindow: BrowserWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })

  if (isDev) {
    mainWindow.loadURL(`http://127.0.0.1:8000`)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile('./build/app/index.html')
  }
}

app.on('ready', createWindow)
