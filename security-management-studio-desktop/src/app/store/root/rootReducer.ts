import { combineReducers } from 'redux'

import { authenticationReducer } from '@/app/store/Authentication/authenticationReducer'
import { organisationsReducer } from '@/app/store/Organisations/organisationsReducer'
import { organisationInfoReducer } from '@/app/store/OrganisationInfo/organisationInfoReducer'

const rootReducer = combineReducers({
  authenticationReducer,
  organisationsReducer,
  organisationInfoReducer,
})

export default rootReducer
