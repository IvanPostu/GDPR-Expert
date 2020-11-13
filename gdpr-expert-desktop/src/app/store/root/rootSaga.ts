import { all } from 'redux-saga/effects'
import {
  fetchLoginSagaWatcher,
  clearAuthDataSagaWatcher,
} from '@/app/store/Authentication/authenticationSagas'
import {
  fetchOrganisationsSagaWatcher,
  reloadOrganisationsSagaWatcher,
} from '@/app/store/Organisations/organisationsSagas'
import { fetchOrganisationInfoSagaWatcher } from '@/app/store/OrganisationInfo/organisationInfoSaga'
import { fetchDepartmentsSagaWatcher } from '@/app/store/Departments/departmentsSagas'

export default function* (): Generator {
  yield all([
    fetchLoginSagaWatcher(),
    clearAuthDataSagaWatcher(),
    fetchOrganisationsSagaWatcher(),
    reloadOrganisationsSagaWatcher(),
    fetchOrganisationInfoSagaWatcher(),
    fetchDepartmentsSagaWatcher(),
  ])
}
