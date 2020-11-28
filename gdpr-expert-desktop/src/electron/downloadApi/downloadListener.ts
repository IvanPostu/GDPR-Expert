import { BrowserWindow, DownloadItem, IpcMainEvent } from 'electron'
import { DownloadOptionType } from './DownloadOption'
import { download } from 'electron-dl'
import {
  DownloadStatusListenerPropType,
  DownloadStatusType,
} from '@/app/rendererCallbacks/downloadStatusListener'

function downloadStaturCreator(
  item: DownloadItem & { id?: string },
  status: DownloadStatusType,
): DownloadStatusListenerPropType {
  const percent = item.getReceivedBytes() / item.getTotalBytes()
  const data: DownloadStatusListenerPropType = {
    downloadObjectId: item['id'] as string,
    percent,
    status,
  }

  return data
}

export function downloadListener(event: IpcMainEvent, data: DownloadOptionType): void {
  const win = BrowserWindow.getFocusedWindow() as BrowserWindow
  const { downloadUniqueId, url } = data
  download(win, url, {
    openFolderWhenDone: true,
    onStarted: (item: DownloadItem & { id?: string }) => {
      item['id'] = downloadUniqueId
      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          const downloadData: DownloadStatusListenerPropType = downloadStaturCreator(
            item,
            'interrupted',
          )

          win.webContents.send('download-file-status', downloadData)
          item.cancel()
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            const downloadData: DownloadStatusListenerPropType = downloadStaturCreator(
              item,
              'paused',
            )
            win.webContents.send('download-file-status', downloadData)
            item.cancel()
          } else {
            const downloadData: DownloadStatusListenerPropType = downloadStaturCreator(
              item,
              'progressing',
            )
            win.webContents.send('download-file-status', downloadData)
          }
        }
      })
    },
  })
}
