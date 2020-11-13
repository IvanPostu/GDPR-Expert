import {
  FetchDepartmentsActionType,
  SetDepartmentsDataActionType,
  StartLoadingActionType,
  StopLoadingActionType,
  departmentssActionTypeConstants as T,
  DepartmentType,
} from './types'

export function fetchDepartmentsActionCreator(organisationId: number): FetchDepartmentsActionType {
  return {
    type: T.FETCH_DEPARTMENTS,
    payload: organisationId,
  }
}

export function setDepartmentsDataActionCreator(
  data: Array<DepartmentType>,
): SetDepartmentsDataActionType {
  const newArr = data
    .sort((a, b) => a.departmentCreatedAt.localeCompare(b.departmentCreatedAt))
    .reverse()

  return {
    type: T.SET_DEPARTMENTS_DATA,
    payload: newArr,
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
