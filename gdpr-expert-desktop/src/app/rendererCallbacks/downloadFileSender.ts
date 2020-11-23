import { DownloadOptionType } from '@/electron/downloadApi/DownloadOption'
import { ipcRenderer } from 'electron'

export function downloadFileSender(data: DownloadOptionType): void {
  // const { downloadUniqueId, filename, url } = data
  ipcRenderer.send('download-file', data)
}
