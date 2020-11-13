import { takeEvery, put, call } from 'redux-saga/effects'

import { FetchLoginActionType, authenticationActionTypeConstants as T } from './types'
import { loginUser } from '@/app/webApi/auth/login'
import {
  stopLoadingActionCreator,
  startLoadingActionCreator,
  setAuthDataActionCreator,
} from '@/app/store/Authentication/actionCreators'
import { setOrganisationsDataActionCreator } from '@/app/store/Organisations/actionCreators'
import { setOrganisationDataActionCreator } from '@/app/store/OrganisationInfo/actionCreators'
import { setDepartmentsDataActionCreator } from '@/app/store/Departments/actionCreators'

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

function* clearAuthDataSagaWorker(): Generator {
  yield put(setOrganisationsDataActionCreator([]))
  yield put(
    setOrganisationDataActionCreator({
      organisationAddress: '',
      organisationAdministrator: '',
      organisationCreatedOnPlatformDateTime: '',
      organisationDepartmentCount: '',
      organisationDescription: '',
      organisationEmail: '',
      organisationEmployeeCount: '',
      organisationFoundedDate: '',
      organisationId: '',
      organisationLegalForm: '',
      organisationLogo: '',
      organisationName: '',
      organisationPhoneNumber: '',
    }),
  )
  yield put(setDepartmentsDataActionCreator([]))
}

export function* fetchLoginSagaWatcher(): Generator {
  yield takeEvery(T.FETCH_LOGIN, fetchLoginSagaWorker)
}

export function* clearAuthDataSagaWatcher(): Generator {
  yield takeEvery(T.CLEAR_AUTH_DATA, clearAuthDataSagaWorker)
}
