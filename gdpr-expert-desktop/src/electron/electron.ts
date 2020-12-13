import { app, BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron'
import isDev from 'electron-is-dev'
import { downloadListener } from './downloadApi/downloadListener'

export const resources = {
  defaultWindowWidth: 800,
  defaultWindowHeight: 600,
}

let mainWindow: BrowserWindow

const createWindow = () => {
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
    mainWindow.loadFile('../app/index.html')
  } else {
    mainWindow.loadFile('./build/app/index.html')
  }
}

app.on('ready', createWindow)

ipcMain.on('download-file', downloadListener)
