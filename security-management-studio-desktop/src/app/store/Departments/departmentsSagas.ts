import { takeEvery, put, call } from 'redux-saga/effects'

import {
  departmentssActionTypeConstants as T,
  DepartmentType,
  FetchDepartmentsActionType,
} from './types'
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
  setDepartmentsDataActionCreator,
} from './actionCreators'
import { getDepartments } from '@/app/webApi/department/getDepartments'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'

function* fetchDepartmentsSagaWorker(action: FetchDepartmentsActionType): Generator {
  const organisationId = action.payload
  try {
    yield put(startLoadingActionCreator())
    const departments = yield call(getDepartments, organisationId)

    if (!UnsuccessResponseData.isUnsuccessResponseData(departments)) {
      yield put(setDepartmentsDataActionCreator(departments as Array<DepartmentType>))
    }

    yield put(stopLoadingActionCreator())
  } catch (e) {
    yield put(stopLoadingActionCreator())
  }
}

export function* fetchDepartmentsSagaWatcher(): Generator {
  yield takeEvery(T.FETCH_DEPARTMENTS, fetchDepartmentsSagaWorker)
}
