import { app, BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'

export const resources = {
  defaultWindowWidth: 800,
  defaultWindowHeight: 600,
  startupWindowWidth: 400,
  startupWindowHeight: 300,
}

let mainWindow: BrowserWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: resources.startupWindowWidth,
    height: resources.startupWindowHeight,
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

  ipcMain.on('to-startup-size', () => {
    mainWindow.setSize(resources.startupWindowWidth, resources.startupWindowHeight)
  })

  ipcMain.on('to-default-size', () => {
    if (!mainWindow.isMaximized) {
      mainWindow.setSize(resources.defaultWindowWidth, resources.defaultWindowHeight)
    }
  })
}

app.on('ready', createWindow)
