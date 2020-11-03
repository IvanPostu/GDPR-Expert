import { all } from 'redux-saga/effects'
import { fetchBotsSagaWatcher } from '@/app/store/Authentication/authenticationSagas'

export default function* (): Generator {
  yield all([fetchBotsSagaWatcher()])
}
