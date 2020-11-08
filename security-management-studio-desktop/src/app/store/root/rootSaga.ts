import { all } from 'redux-saga/effects'
import { fetchBotsSagaWatcher } from '@/app/store/Authentication/authenticationSagas'
import {
  fetchOrganisationsSagaWatcher,
  reloadOrganisationsSagaWatcher,
} from '@/app/store/Organisations/organisationsSagas'
import { fetchOrganisationInfoSagaWatcher } from '@/app/store/OrganisationInfo/organisationInfoSaga'

export default function* (): Generator {
  yield all([
    fetchBotsSagaWatcher(),
    fetchOrganisationsSagaWatcher(),
    reloadOrganisationsSagaWatcher(),
    fetchOrganisationInfoSagaWatcher(),
  ])
}
