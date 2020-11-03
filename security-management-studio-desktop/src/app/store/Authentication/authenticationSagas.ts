import { takeEvery, put, call } from 'redux-saga/effects'

import { FetchLoginActionType, authenticationActionTypeConstants as T } from './types'
import { loginUser } from '@/app/webApi/auth/login'
import {
  stopLoadingActionCreator,
  startLoadingActionCreator,
  setAuthDataActionCreator,
} from '@/app/store/Authentication/actionCreators'

function* fetchLoginSagaWorker(action: FetchLoginActionType): Generator {
  const { email, password } = action.payload

  try {
    yield put(startLoadingActionCreator())
    const isAuthenticatedWithSuccess = yield call(loginUser, email, password)
    if (isAuthenticatedWithSuccess) {
      yield put(
        setAuthDataActionCreator({
          userEmail: email,
          isAuthenticated: true,
          message: '',
          messageStatus: 'info',
        }),
      )
    } else {
      yield put(
        setAuthDataActionCreator({
          userEmail: '',
          isAuthenticated: false,
          message: 'Email sau password invalid.',
          messageStatus: 'err',
        }),
      )
    }
    yield put(stopLoadingActionCreator())
  } catch (e) {
    yield put(stopLoadingActionCreator())
    yield put(
      setAuthDataActionCreator({
        userEmail: '',
        isAuthenticated: false,
        message: 'Email sau password invalid.',
        messageStatus: 'err',
      }),
    )
  }
}

export function* fetchBotsSagaWatcher(): Generator {
  yield takeEvery(T.FETCH_LOGIN, fetchLoginSagaWorker)
}
