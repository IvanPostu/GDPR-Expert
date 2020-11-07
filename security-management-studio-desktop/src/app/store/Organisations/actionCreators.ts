import {
  FetchOrganisationsActionType,
  ReloadPageActionType,
  SetOrganisationsDataActionType,
  StartLoadingActionType,
  StopLoadingActionType,
  organisationsActionTypeConstants as T,
} from './types'

import { OrganisationResponseTypeA } from '@/app/webApi/organisation/getOrganisations'

export function fetchOrganisationsActionCreator(): FetchOrganisationsActionType {
  return {
    type: T.FETCH_ORGANISATIONS,
  }
}

export function reloadOrganisationsPageActionCreator(): ReloadPageActionType {
  return {
    type: T.RELOAD_PAGE,
  }
}

export function setOrganisationsDataActionCreator(
  data: Array<OrganisationResponseTypeA>,
): SetOrganisationsDataActionType {
  return {
    type: T.SET_ORGANISATIONS_DATA,
    payload: data,
  }
}

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
