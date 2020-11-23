import { BrowserWindow, DownloadItem, IpcMainEvent, WebContents } from 'electron'
import { DownloadOptionType } from './DownloadOption'
import { download } from 'electron-dl'

export async function downloadListener(event: IpcMainEvent, data: DownloadOptionType) {
  const win = BrowserWindow.getFocusedWindow() as BrowserWindow
  const { downloadUniqueId, filename, url } = data
  await download(win, url, {
    openFolderWhenDone: true,
    onStarted: (item: DownloadItem & { id?: string }) => {
      item['id'] = downloadUniqueId
      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          // console.log('Download is interrupted but can be resumed')
          item.cancel()
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            // console.log('Download is paused')
            item.cancel()
          } else {
            // console.log(`${item['id']} precent: ${item.getReceivedBytes() / item.getTotalBytes()}`)
            const percent = item.getReceivedBytes() / item.getTotalBytes()
            win.webContents.send('download-file-status', item['id'], percent)
          }
        }
      })
    },

    filename,
  })
}
