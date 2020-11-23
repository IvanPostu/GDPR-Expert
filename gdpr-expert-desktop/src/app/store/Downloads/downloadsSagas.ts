import { takeEvery, put } from 'redux-saga/effects'
import { UpdateItemActionType, downloadsActionTypeConstants as T } from './types'
import { finishDownloadActionCreator } from './actionCreators'

function* updateDownloadsSagaWorker(action: UpdateItemActionType): Generator {
  const { id, percent } = action.payload
  if (percent >= 1.0) {
    yield put(finishDownloadActionCreator(id))
  }
}

export function* updateDownloadsSagaWatcher(): Generator {
  yield takeEvery(T.UPDATE_ITEM, updateDownloadsSagaWorker)
}
