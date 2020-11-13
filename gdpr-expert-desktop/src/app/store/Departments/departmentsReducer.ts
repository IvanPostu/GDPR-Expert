import { Reducer } from 'redux'

import {
  DepartmentsStateType,
  DepartmentsRootActionType,
  departmentssActionTypeConstants as T,
} from './types'

const initialState: DepartmentsStateType = {
  isLoadProcess: false,
  isLoadedFirstTime: false,
  departments: [],
}

export const departmentsReducer: Reducer<DepartmentsStateType, DepartmentsRootActionType> = (
  state: DepartmentsStateType = initialState,
  action: DepartmentsRootActionType,
): DepartmentsStateType => {
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
    case T.SET_DEPARTMENTS_DATA:
      return {
        ...state,
        isLoadedFirstTime: true,
        departments: action.payload,
      }
    case T.FETCH_DEPARTMENTS:
    default:
      return state
  }
}
