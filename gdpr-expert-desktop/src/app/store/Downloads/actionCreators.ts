import { downloadFileSender } from '@/app/rendererCallbacks/downloadFileSender'
import {
  downloadsActionTypeConstants as T,
  CancelDownloadActionType,
  FinishDownloadActionType,
  StartDownloadActionType,
  UpdateItemActionType,
} from './types'
import { nanoid } from 'nanoid'

export function startDownloadActionCreator(url: string, filename: string): StartDownloadActionType {
  const uniqueId = nanoid(19) + Date.now().toString()
  downloadFileSender({
    url,
    downloadUniqueId: uniqueId,
    filename,
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
  downloadObjectId: string,
  newPercent: number,
): UpdateItemActionType {
  return {
    payload: {
      id: downloadObjectId,
      percent: newPercent,
    },
    type: T.UPDATE_ITEM,
  }
}
