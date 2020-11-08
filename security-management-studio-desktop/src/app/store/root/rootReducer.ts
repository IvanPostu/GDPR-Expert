import { combineReducers } from 'redux'

import { authenticationReducer } from '@/app/store/Authentication/authenticationReducer'
import { organisationsReducer } from '@/app/store/Organisations/organisationsReducer'
import { organisationReducer } from '@/app/store/OrganisationInfo/organisationReducer'

const rootReducer = combineReducers({
  authenticationReducer,
  organisationsReducer,
  organisationReducer,
})

export default rootReducer
