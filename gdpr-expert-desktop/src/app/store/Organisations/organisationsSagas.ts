import { takeEvery, put, call } from 'redux-saga/effects'

import { organisationsActionTypeConstants as T } from './types'
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
  setOrganisationsDataActionCreator,
} from './actionCreators'
import {
  getOrganisations,
  OrganisationResponseTypeA,
} from '@/app/webApi/organisation/getOrganisations'

function* fetchOrganisationsSagaWorker(): Generator {
  try {
    yield put(startLoadingActionCreator())
    const organisations = yield call(getOrganisations)
    yield put(setOrganisationsDataActionCreator(organisations as Array<OrganisationResponseTypeA>))
    yield put(stopLoadingActionCreator())
  } catch (e) {
    yield put(stopLoadingActionCreator())
  }
}

export function* fetchOrganisationsSagaWatcher(): Generator {
  yield takeEvery(T.FETCH_ORGANISATIONS, fetchOrganisationsSagaWorker)
}

export function* reloadOrganisationsSagaWatcher(): Generator {
  yield takeEvery(T.RELOAD_PAGE, fetchOrganisationsSagaWorker)
}
