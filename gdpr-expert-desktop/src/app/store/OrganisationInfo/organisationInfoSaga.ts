import { takeEvery, put, call } from 'redux-saga/effects'

import { organisationInfoActionTypeConstants as T, FetchOrganisationInfoActionType } from './types'
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
  setOrganisationDataActionCreator,
  handleApiExceptionActionCreator,
} from './actionCreators'
import { getOrganisationById, ResponseType } from '@/app/webApi/organisation/organisationById'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'

function* fetchOrganisationInfoSagaWorker(action: FetchOrganisationInfoActionType): Generator {
  const organisationId = action.payload
  try {
    yield put(startLoadingActionCreator())
    const apiResult = yield call(getOrganisationById, organisationId)

    if (!UnsuccessResponseData.isUnsuccessResponseData(apiResult)) {
      const data = apiResult as ResponseType
      yield put(
        setOrganisationDataActionCreator({
          ...data,
        }),
      )
    } else {
      const err = apiResult as UnsuccessResponseData
      if (err.isSessionExpired) {
        put(clearAuthDataActionCreator())
      }
    }
    yield put(stopLoadingActionCreator())
  } catch (e) {
    yield put(handleApiExceptionActionCreator(/*errorData*/))
    yield put(stopLoadingActionCreator())
  }
}

export function* fetchOrganisationInfoSagaWatcher(): Generator {
  yield takeEvery(T.FETCH_ORGANISATION, fetchOrganisationInfoSagaWorker)
}
