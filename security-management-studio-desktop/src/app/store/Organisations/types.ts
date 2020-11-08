import { Action } from 'redux'

import { OrganisationResponseTypeA } from '@/app/webApi/organisation/getOrganisations'

export enum organisationsActionTypeConstants {
  FETCH_ORGANISATIONS = '@Organisations/FETCH_ORGANISATIONS',
  START_LOADING = '@Organisations/START_LOADING',
  STOP_LOADING = '@Organisations/STOP_LOADING',
  SET_ORGANISATIONS_DATA = '@Organisations/SET_ORGANISATIONS_DATA',
  RELOAD_PAGE = '@Organisations/RELOAD_PAGE',
}

export type OrganisationsStateType = {
  isLoadProcess: boolean
  organisations: Array<OrganisationResponseTypeA>
  isLoadedFirstTime: boolean
}

export interface FetchOrganisationsActionType extends Action {
  type: typeof organisationsActionTypeConstants.FETCH_ORGANISATIONS
}

export interface StartLoadingActionType extends Action {
  type: typeof organisationsActionTypeConstants.START_LOADING
}

export interface StopLoadingActionType extends Action {
  type: typeof organisationsActionTypeConstants.STOP_LOADING
}

export interface SetOrganisationsDataActionType extends Action {
  type: typeof organisationsActionTypeConstants.SET_ORGANISATIONS_DATA
  payload: Array<OrganisationResponseTypeA>
}

export interface ReloadPageActionType extends Action {
  type: typeof organisationsActionTypeConstants.RELOAD_PAGE
}

export type OrganisationsRootActionType =
  | FetchOrganisationsActionType
  | StartLoadingActionType
  | StopLoadingActionType
  | SetOrganisationsDataActionType
  | ReloadPageActionType
