import { combineReducers } from 'redux'

import { authenticationReducer } from '@/app/store/Authentication/authenticationReducer'
import { organisationsReducer } from '@/app/store/Organisations/organisationsReducer'
import { organisationInfoReducer } from '@/app/store/OrganisationInfo/organisationInfoReducer'
import { departmentsReducer } from '@/app/store/Departments/departmentsReducer'
import { downloadsReducer } from '@/app/store/Downloads/downloadsReducer'

const rootReducer = combineReducers({
  authenticationReducer,
  organisationsReducer,
  organisationInfoReducer,
  departmentsReducer,
  downloadsReducer,
})

export default rootReducer
