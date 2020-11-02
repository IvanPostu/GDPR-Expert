import {
  authenticationActionTypeConstants as T,
  StopLoadingActionType,
  StartLoadingActionType,
  ClearAuthDataActionType,
  SetAuthDataActionType,
  LogoutActionType,
  FetchLoginActionType,
  AuthenticationType,
} from './types'

function startLoadingActionCreator(): StartLoadingActionType {
  return {
    type: T.START_LOADING,
  }
}

function stopLoadingActionCreator(): StopLoadingActionType {
  return {
    type: T.STOP_LOADING,
  }
}

function clearAuthDataActionCreator(): ClearAuthDataActionType {
  return {
    type: T.CLEAR_AUTH_DATA,
  }
}

function setAuthDataActionCreator(data: AuthenticationType): SetAuthDataActionType {
  return {
    type: T.SET_AUTH_DATA,
    payload: {
      ...data,
    },
  }
}

export function logoutActionCreator(): LogoutActionType {
  return {
    type: T.LOGOUT,
  }
}

export function fetchLoginActionCreator(email: string, password: string): FetchLoginActionType {
  return {
    type: T.FETCH_LOGIN,
    payload: {
      email,
      password,
    },
  }
}
