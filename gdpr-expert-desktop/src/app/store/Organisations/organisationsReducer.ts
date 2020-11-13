import { Reducer } from 'redux'

import {
  OrganisationsStateType,
  organisationsActionTypeConstants as T,
  OrganisationsRootActionType,
} from './types'

const initialState: OrganisationsStateType = {
  isLoadProcess: false,
  isLoadedFirstTime: false,
  organisations: [],
}

export const organisationsReducer: Reducer<OrganisationsStateType, OrganisationsRootActionType> = (
  state: OrganisationsStateType = initialState,
  action: OrganisationsRootActionType,
): OrganisationsStateType => {
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
    case T.SET_ORGANISATIONS_DATA:
      return {
        ...state,
        isLoadedFirstTime: true,
        organisations: action.payload,
      }
    case T.RELOAD_PAGE:
    case T.FETCH_ORGANISATIONS:
    default:
      return state
  }
}
