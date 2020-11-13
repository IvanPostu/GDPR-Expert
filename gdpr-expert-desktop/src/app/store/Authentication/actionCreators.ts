import {
  authenticationActionTypeConstants as T,
  StopLoadingActionType,
  StartLoadingActionType,
  ClearAuthDataActionType,
  SetAuthDataActionType,
  FetchLoginActionType,
  AuthenticationType,
  SetMessageActionType,
  MessageType,
} from './types'

export function startLoadingActionCreator(): StartLoadingActionType {
  return {
    type: T.START_LOADING,
  }
}

export function stopLoadingActionCreator(): StopLoadingActionType {
  return {
    type: T.STOP_LOADING,
  }
}

export function clearAuthDataActionCreator(): ClearAuthDataActionType {
  return {
    type: T.CLEAR_AUTH_DATA,
  }
}

export function setAuthDataActionCreator(data: AuthenticationType): SetAuthDataActionType {
  return {
    type: T.SET_AUTH_DATA,
    payload: {
      ...data,
    },
  }
}

export function clearMessageActionCreator(): SetMessageActionType {
  return {
    type: T.SET_MESSAGE,
    payload: {
      message: '',
      messageStatus: 'info',
    },
  }
}

export function setMessageActionCreator(msg: MessageType): SetMessageActionType {
  return {
    type: T.SET_MESSAGE,
    payload: {
      ...msg,
    },
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
