import { Action } from 'redux'

export enum organisationInfoActionTypeConstants {
  FETCH_ORGANISATION = '@OrganisationInfo/FETCH_ORGANISATION',
  START_LOADING = '@OrganisationInfo/START_LOADING',
  STOP_LOADING = '@OrganisationInfo/STOP_LOADING',
  SET_ORGANISATION_DATA = '@OrganisationInfo/SET_ORGANISATION_DATA',
  HANDLE_API_EXCEPTION = '@OrganisationInfo/HANDLE_API_EXCEPTION',
}

export type OrganisationInfoType = {
  organisationId: string
  organisationAddress: string
  organisationCreatedOnPlatformDateTime: string
  organisationEmail: string
  organisationDepartmentCount: string
  organisationDescription: string
  organisationEmployeeCount: string
  organisationName: string
  organisationLogo: string
  organisationFoundedDate: string
  organisationLegalForm: string
  organisationAdministrator: string
  organisationPhoneNumber: string
}

export type OrganisationInfoStateType = {
  isLoading: boolean
  organisation: OrganisationInfoType
  errorMessages: Array<string>
}

export interface HandleApiExceptionActionType extends Action {
  type: typeof organisationInfoActionTypeConstants.HANDLE_API_EXCEPTION
  payload: Array<string>
}

export interface FetchOrganisationInfoActionType extends Action {
  type: typeof organisationInfoActionTypeConstants.FETCH_ORGANISATION
  payload: number
}

export interface StartLoadingActionType extends Action {
  type: typeof organisationInfoActionTypeConstants.START_LOADING
}

export interface StopLoadingActionType extends Action {
  type: typeof organisationInfoActionTypeConstants.STOP_LOADING
}

export interface SetOrganisationInfoDataActionType extends Action {
  type: typeof organisationInfoActionTypeConstants.SET_ORGANISATION_DATA
  payload: OrganisationInfoType
}

export type OrganisationRootActionType =
  | FetchOrganisationInfoActionType
  | StartLoadingActionType
  | StopLoadingActionType
  | SetOrganisationInfoDataActionType
  | HandleApiExceptionActionType
