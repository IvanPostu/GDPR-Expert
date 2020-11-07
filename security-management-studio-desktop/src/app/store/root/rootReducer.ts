import { combineReducers } from 'redux'

import { authenticationReducer } from '@/app/store/Authentication/authenticationReducer'
import { organisationsReducer } from '@/app/store/Organisations/organisationsReducer'

const rootReducer = combineReducers({ authenticationReducer, organisationsReducer })

export default rootReducer
