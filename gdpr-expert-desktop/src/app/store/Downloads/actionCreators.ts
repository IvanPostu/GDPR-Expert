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

export function startDownloadActionCreator(url: string): StartDownloadActionType {
  const uniqueId = nanoid(16)

  downloadFileSender({
    url,
    downloadUniqueId: uniqueId,
  })

  return {
    payload: {
      filename: 'Wait...',
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
      status: data.status,
      filename: data.filename || '',
    },
    type: T.UPDATE_ITEM,
  }
}
