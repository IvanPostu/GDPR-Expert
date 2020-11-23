import { ipcRenderer } from 'electron'

export function downloadStatusListener(
  callback: (downloadObjectId: string, percent: number) => void,
) {
  ipcRenderer.on('download-file-status', (event, downloadObjectId: string, percent: number) => {
    callback(downloadObjectId, percent)
  })
}
