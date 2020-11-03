import { Reducer } from 'redux'
import {
  authenticationActionTypeConstants as T,
  AuthenticationStateType,
  AuthenticationRootActionType,
} from './types'

const initialState: AuthenticationStateType = {
  isAuthenticated: false,
  isLoadProcess: false,
  userEmail: '',
  userFirstName: '',
  userLastName: '',
}

export const authenticationReducer: Reducer<
  AuthenticationStateType,
  AuthenticationRootActionType
> = (state: AuthenticationStateType = initialState, action: AuthenticationRootActionType) => {
  switch (action.type) {
    case T.START_LOADING:
      return {
        ...state,
        isLoadProcess: true,
      }
    case T.STOP_LOADING:
      return {
        ...state,
        isLoadProcess: false,
      }
    case T.SET_AUTH_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case T.CLEAR_AUTH_DATA:
      return {
        ...state,
        isAuthenticated: false,
        userEmail: '',
      }
    case T.FETCH_LOGIN:
    case T.LOGOUT:
    default:
      return state
  }
}
