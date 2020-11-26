import { downloadFileSender } from '@/app/rendererCallbacks/downloadFileSender'
import {
  downloadsActionTypeConstants as T,
  CancelDownloadActionType,
  FinishDownloadActionType,
  StartDownloadActionType,
  UpdateItemActionType,
} from './types'
import { nanoid } from 'nanoid'
import { DownloadStatusListenerPropType } from '@/app/rendererCallbacks/downloadStatusListener'

export function startDownloadActionCreator(url: string, filename: string): StartDownloadActionType {
  const uniqueId = nanoid(19) + Date.now().toString()
  downloadFileSender({
    filename,
    url,
    downloadUniqueId: uniqueId,
  })

  return {
    payload: {
      filename,
      url,
      id: uniqueId,
    },
    type: T.START_DOWNLOAD,
  }
}

export function finishDownloadActionCreator(downloadObjectId: string): FinishDownloadActionType {
  return {
    payload: {
      id: downloadObjectId,
    },
    type: T.FINISH_DOWNLOAD,
  }
}

export function cancelDownloadActionCreator(downloadObjectId: string): CancelDownloadActionType {
  return {
    payload: {
      id: downloadObjectId,
    },
    type: T.CANCEL_DOWNLOAD,
  }
}

export function updateDownloadItemActionCreator(
  data: DownloadStatusListenerPropType,
): UpdateItemActionType {
  return {
    payload: {
      id: data.downloadObjectId,
      percent: data.percent,
    },
    type: T.UPDATE_ITEM,
  }
}
