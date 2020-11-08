import { Reducer } from 'redux'
import {
  OrganisationInfoStateType,
  OrganisationRootActionType,
  organisationInfoActionTypeConstants as T,
} from './types'

const initialState: OrganisationInfoStateType = {
  isLoading: false,
  organisation: {
    organisationAddress: '',
    organisationAdministrator: '',
    organisationCreatedOnPlatformDateTime: '',
    organisationDepartmentCount: '',
    organisationDescription: '',
    organisationEmail: '',
    organisationEmployeeCount: '',
    organisationFoundedDate: '',
    organisationId: '',
    organisationLegalForm: '',
    organisationLogo: '',
    organisationName: '',
    organisationPhoneNumber: '',
  },
  errorMessages: [],
}

export const organisationReducer: Reducer<OrganisationInfoStateType, OrganisationRootActionType> = (
  state: OrganisationInfoStateType = initialState,
  action: OrganisationRootActionType,
): OrganisationInfoStateType => {
  switch (action.type) {
    case T.START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case T.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case T.SET_ORGANISATION_DATA:
      return {
        ...state,
        organisation: action.payload,
      }
    case T.HANDLE_API_EXCEPTION:
      return {
        ...state,
        errorMessages: action.payload,
      }
    case T.FETCH_ORGANISATION:
    default:
      return state
  }
}
