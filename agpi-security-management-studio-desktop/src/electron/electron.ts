import path from 'path'
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

  mainWindow.loadFile('./build/app/index.html');

  // mainWindow.loadFile(path.resolve('./', 'resources', 'app', 'build', 'app', 'index.html'))
  // mainWindow.loadURL()
  // if (isDev) {
  //   mainWindow.loadURL(`http://127.0.0.1:8000`)
  // } else {
  // mainWindow.loadFile('../app/index.html')
  // }
}

app.on('ready', createWindow)
