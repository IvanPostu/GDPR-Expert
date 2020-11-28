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
import { webServerURL } from '@/app/constants/webServerUrl'

export function startDownloadActionCreator(
  documentId: number,
  employeeId: number,
  filename: string,
): StartDownloadActionType {
  const uniqueId = nanoid(19) + Date.now().toString()
  const url = `${webServerURL}/api/employee/docs?employeeId=${employeeId}&documentId=${documentId}`

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
      status: data.status,
    },
    type: T.UPDATE_ITEM,
  }
}
