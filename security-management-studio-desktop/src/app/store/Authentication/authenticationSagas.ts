import { takeEvery, put, call } from 'redux-saga/effects'

import { FetchLoginActionType, authenticationActionTypeConstants as T } from './types'

function* fetchLoginSagaWorker(action: FetchLoginActionType): Generator {
  const { email, password } = action.payload

  // try {
  //   const result = yield call(fetchBots, name, page)
  //   yield put(stopLoading())
  //   yield put(updateBots(result.bots, result.name, result.haveNextPage, result.currentPage))
  // } catch (e) {
  //   const errorMessage = 'Ошибка...'
  //   yield put(requestError(errorMessage))
  //   yield put(stopLoading())
  // }
}

export function* fetchBotsSagaWatcher(): Generator {
  yield takeEvery(T.FETCH_LOGIN, fetchLoginSagaWorker)
}
