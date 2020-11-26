import { BrowserWindow, DownloadItem, IpcMainEvent } from 'electron'
import { DownloadOptionType } from './DownloadOption'
import { download } from 'electron-dl'

export function downloadListener(event: IpcMainEvent, data: DownloadOptionType): void {
  const win = BrowserWindow.getFocusedWindow() as BrowserWindow
  const { downloadUniqueId, url } = data
  download(win, url, {
    openFolderWhenDone: true,
    onStarted: (item: DownloadItem & { id?: string }) => {
      item['id'] = downloadUniqueId
      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          item.cancel()
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            item.cancel()
          } else {
            const percent = item.getReceivedBytes() / item.getTotalBytes()
            win.webContents.send('download-file-status', item['id'], percent)
          }
        }
      })
    },
  }).then((a) => {
    console.log('Download complet.')
  })
}
