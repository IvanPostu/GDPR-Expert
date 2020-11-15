import { app, BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

export const resources = {
  defaultWindowWidth: 800,
  defaultWindowHeight: 600,
}

let mainWindow: BrowserWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: resources.defaultWindowWidth,
    height: resources.defaultWindowHeight,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
    },
    frame: false,
  })

  if (isDev) {
    // mainWindow.webContents.openDevTools()
  }

  mainWindow.loadFile('../app/index.html')
}

app.on('ready', createWindow)
