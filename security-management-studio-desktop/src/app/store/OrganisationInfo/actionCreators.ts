import {
  organisationInfoActionTypeConstants as T,
  FetchOrganisationInfoActionType,
  StartLoadingActionType,
  StopLoadingActionType,
  SetOrganisationInfoDataActionType,
  OrganisationInfoType,
  HandleApiExceptionActionType,
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

export function fetchOrganisationActionCreator(
  organisationId: number,
): FetchOrganisationInfoActionType {
  return {
    type: T.FETCH_ORGANISATION,
    payload: organisationId,
  }
}

export function setOrganisationDataActionCreator(
  organisationData: OrganisationInfoType,
): SetOrganisationInfoDataActionType {
  return {
    type: T.SET_ORGANISATION_DATA,
    payload: organisationData,
  }
}

export function handleApiExceptionActionCreator(): HandleApiExceptionActionType {
  // e: ErrorResponseType,
  return {
    type: T.HANDLE_API_EXCEPTION,
    payload: ['Eroare în procesul execuției cererii.'],
  }
}
