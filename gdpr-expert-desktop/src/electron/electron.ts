import { app, BrowserWindow, ipcMain } from 'electron'
import { download } from 'electron-dl'
import isDev from 'electron-is-dev'
import { DownloadOptionType } from './downloadApi/DownloadOption'

// electronDl()

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

  mainWindow.loadFile('../../app/index.html')
}

app.on('ready', createWindow)

ipcMain.on('download-file', (event, param: DownloadOptionType) => {
  const win = BrowserWindow.getFocusedWindow() as BrowserWindow
  const { url } = param
  download(win, url, {
    openFolderWhenDone: true,
    onProgress: (progress) => {
      event.reply('download-file-status', param.downloadUniqueId, progress)
    },
  })
})
