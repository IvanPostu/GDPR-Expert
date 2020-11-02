import { combineReducers } from 'redux'

import { authenticationReducer } from '@/app/store/Authentication/authenticationReducer'

const rootReducer = combineReducers({ authenticationReducer })

export default rootReducer
