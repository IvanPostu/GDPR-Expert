import { Action } from 'redux'

export enum authenticationActionTypeConstants {
  FETCH_LOGIN = '@Authentication/FETCH_LOGIN',
  LOGOUT = '@Authentication/LOGOUT',
  START_LOADING = '@Authentication/START_LOADING',
  STOP_LOADING = '@Authentication/STOP_LOADING',
  SET_AUTH_DATA = '@Authentication/SET_AUTH_DATA',
  SET_MESSAGE = '@Authentication/SET_MESSAGE',
  CLEAR_AUTH_DATA = '@Authentication/CLEAR_AUTH_DATA',
}

export type AuthenticationStateType = {
  isLoadProcess: boolean
  userFirstName: string
  userLastName: string
} & AuthenticationType

export type MessageType = {
  message: string
  messageStatus: 'warn' | 'err' | 'info' | 'success'
}

export type AuthenticationType = {
  isAuthenticated: boolean
  userEmail: string
} & MessageType

export type FetchLoginActionPayloadType = {
  readonly email: string
  readonly password: string
}

export interface FetchLoginActionType extends Action {
  type: typeof authenticationActionTypeConstants.FETCH_LOGIN
  payload: FetchLoginActionPayloadType
}

export interface SetMessageActionType extends Action {
  type: typeof authenticationActionTypeConstants.SET_MESSAGE
  payload: MessageType
}

export interface LogoutActionType extends Action {
  type: typeof authenticationActionTypeConstants.LOGOUT
}

export interface StartLoadingActionType extends Action {
  type: typeof authenticationActionTypeConstants.START_LOADING
}

export interface StopLoadingActionType extends Action {
  type: typeof authenticationActionTypeConstants.STOP_LOADING
}

export interface SetAuthDataActionType extends Action {
  type: typeof authenticationActionTypeConstants.SET_AUTH_DATA
  payload: AuthenticationType
}

export interface ClearAuthDataActionType extends Action {
  type: typeof authenticationActionTypeConstants.CLEAR_AUTH_DATA
}

export type AuthenticationRootActionType =
  | FetchLoginActionType
  | LogoutActionType
  | StartLoadingActionType
  | StopLoadingActionType
  | SetAuthDataActionType
  | ClearAuthDataActionType
  | SetMessageActionType
