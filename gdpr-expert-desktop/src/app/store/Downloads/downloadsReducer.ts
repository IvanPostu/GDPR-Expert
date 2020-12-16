import { Reducer } from 'redux'

import {
  downloadsActionTypeConstants as T,
  DownloadsStateType,
  DownloadsRootActionType,
} from './types'

const initialState: DownloadsStateType = {
  downloads: [],
}

export const downloadsReducer: Reducer<DownloadsStateType, DownloadsRootActionType> = (
  state: DownloadsStateType = initialState,
  action: DownloadsRootActionType,
): DownloadsStateType => {
  switch (action.type) {
    case T.START_DOWNLOAD:
      return {
        ...state,
        downloads: state.downloads.concat([
          {
            filename: action.payload.filename,
            id: action.payload.id,
            url: action.payload.url,
            percent: 0,
          },
        ]),
      }
    case T.UPDATE_ITEM: {
      const { percent, id } = action.payload
      const itemIndex = state.downloads.findIndex((a) => a.id === id)

      if (itemIndex === -1) return state

      const item = state.downloads[itemIndex]

      item.percent = percent
      if (Boolean(action.payload.filename)) {
        item.filename = action.payload.filename as string
      }

      return {
        ...state,
        downloads: [...state.downloads],
      }
    }
    case T.CANCEL_DOWNLOAD:
    case T.FINISH_DOWNLOAD:
      return {
        ...state,
        downloads: state.downloads.filter((a) => a.id !== action.payload.id),
      }
    default:
      return state
  }
}
