import { BrowserWindow, DownloadItem, IpcMainEvent } from 'electron'
import { DownloadOptionType } from './DownloadOption'
import { download } from 'electron-dl'
import { DownloadStatusListenerPropType } from '@/app/rendererCallbacks/downloadStatusListener'

export function downloadListener(event: IpcMainEvent, data: DownloadOptionType): void {
  const win = BrowserWindow.getFocusedWindow() as BrowserWindow
  const { downloadUniqueId, url } = data
  download(win, url, {
    openFolderWhenDone: true,
    onStarted: (item: DownloadItem & { id?: string }) => {
      item['id'] = downloadUniqueId
      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          const percent = item.getReceivedBytes() / item.getTotalBytes()
          const data: DownloadStatusListenerPropType = {
            downloadObjectId: item['id'] as string,
            percent,
            status: 'interrupted',
          }
          win.webContents.send('download-file-status', data)
          item.cancel()
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            const percent = item.getReceivedBytes() / item.getTotalBytes()
            const data: DownloadStatusListenerPropType = {
              downloadObjectId: item['id'] as string,
              percent,
              status: 'paused',
            }
            win.webContents.send('download-file-status', data)
            item.cancel()
          } else {
            const percent = item.getReceivedBytes() / item.getTotalBytes()
            const data: DownloadStatusListenerPropType = {
              downloadObjectId: item['id'] as string,
              percent,
              status: 'progressing',
            }
            win.webContents.send('download-file-status', data)
          }
        }
      })
    },
  })
}
