import { BrowserWindow, DownloadItem, IpcMainEvent } from 'electron'
import { DownloadOptionType } from './DownloadOption'
import { download } from 'electron-dl'
import {
  DownloadStatusListenerPropType,
  DownloadStatusType,
} from '@/app/rendererCallbacks/downloadStatusListener'
// import { dialog, shell } from 'electron'

function downloadStatusCreator(
  item: DownloadItem & { id?: string; isCompleted?: boolean },
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
    // filename: filenamea,
    onStarted: (item: DownloadItem & { id?: string }) => {
      item['id'] = downloadUniqueId

      win.webContents.send('download-file-start', {
        downloadObjectId: downloadUniqueId,
        filename: item.getFilename(),
        percent: 0,
        status: 'progressing',
      } as DownloadStatusListenerPropType)

      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          const downloadData: DownloadStatusListenerPropType = downloadStatusCreator(
            item,
            'interrupted',
          )

          win.webContents.send('download-file-status', downloadData)
          item.cancel()
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            const downloadData: DownloadStatusListenerPropType = downloadStatusCreator(
              item,
              'paused',
            )
            win.webContents.send('download-file-status', downloadData)
            item.cancel()
          } else {
            const downloadData: DownloadStatusListenerPropType = downloadStatusCreator(
              item,
              'progressing',
            )

            win.webContents.send('download-file-status', downloadData)
          }
        }
      })
    },
  }).catch(() => {
    const downloadData: DownloadStatusListenerPropType = {
      downloadObjectId: downloadUniqueId,
      percent: 0,
      status: 'interrupted',
    }

    win.webContents.send('download-file-status', downloadData)
  })
}
