import { DownloadStatusType } from '@/app/rendererCallbacks/downloadStatusListener'
import { Action } from 'redux'

export enum downloadsActionTypeConstants {
  START_DOWNLOAD = '@Downloads/START_DOWNLOAD',
  FINISH_DOWNLOAD = '@Downloads/FINISH_DOWNLOAD',
  CANCEL_DOWNLOAD = '@Downloads/CANCEL_DOWNLOAD',
  UPDATE_ITEM = '@Downloads/UPDATE_ITEM',
}

export type DownloadsStateType = {
  downloads: Array<DownloadEntity>
}

export type DownloadEntity = {
  id: string
  percent: number
  filename: string
  url: string
}

export interface StartDownloadActionType {
  type: downloadsActionTypeConstants.START_DOWNLOAD
  payload: {
    url: string
    id: string
    filename: string
  }
}

export interface FinishDownloadActionType
  extends Action<downloadsActionTypeConstants.FINISH_DOWNLOAD> {
  payload: {
    id: string
  }
}

export interface CancelDownloadActionType
  extends Action<downloadsActionTypeConstants.CANCEL_DOWNLOAD> {
  payload: {
    id: string
  }
}

export interface UpdateItemActionType {
  type: downloadsActionTypeConstants.UPDATE_ITEM
  payload: {
    id: string
    percent: number
    status: DownloadStatusType
  }
}

export type DownloadsRootActionType =
  | StartDownloadActionType
  | FinishDownloadActionType
  | CancelDownloadActionType
  | UpdateItemActionType
