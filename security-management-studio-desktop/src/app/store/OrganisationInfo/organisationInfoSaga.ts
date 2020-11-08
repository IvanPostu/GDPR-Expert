import { takeEvery, put, call } from 'redux-saga/effects'

import { organisationInfoActionTypeConstants as T, FetchOrganisationInfoActionType } from './types'
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
  setOrganisationDataActionCreator,
  handleApiExceptionActionCreator,
} from './actionCreators'
import { getOrganisationById, ResponseType } from '@/app/webApi/organisation/organisationById'

function* fetchOrganisationInfoSagaWorker(action: FetchOrganisationInfoActionType): Generator {
  const organisationId = action.payload
  try {
    yield put(startLoadingActionCreator())
    const apiResult = yield call(getOrganisationById, organisationId)
    const data = apiResult as ResponseType
    yield put(
      setOrganisationDataActionCreator({
        ...data,
      }),
    )
    yield put(stopLoadingActionCreator())
  } catch (e) {
    // const errorData = e as ErrorResponseType
    yield put(handleApiExceptionActionCreator(/*errorData*/))
    yield put(stopLoadingActionCreator())
  }
}

export function* fetchOrganisationInfoSagaWatcher(): Generator {
  yield takeEvery(T.FETCH_ORGANISATION, fetchOrganisationInfoSagaWorker)
}
