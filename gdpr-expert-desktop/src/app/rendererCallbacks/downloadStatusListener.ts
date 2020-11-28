import { ipcRenderer } from 'electron'

export type DownloadStatusListenerPropType = {
  downloadObjectId: string
  percent: number
  status: DownloadStatusType
}

export type DownloadStatusType = 'paused' | 'interrupted' | 'progressing'

export function downloadStatusListener(
  callback: (data: DownloadStatusListenerPropType) => void,
): void {
  ipcRenderer.on('download-file-status', (event, data: DownloadStatusListenerPropType) => {
    callback(data)
  })
}
