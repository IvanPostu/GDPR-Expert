import { Action } from 'redux'

export enum departmentssActionTypeConstants {
  FETCH_DEPARTMENTS = '@Departments/FETCH_DEPARTMENTS',
  START_LOADING = '@Departments/START_LOADING',
  STOP_LOADING = '@Departments/STOP_LOADING',
  SET_DEPARTMENTS_DATA = '@Departments/SET_DEPARTMENTS_DATA',
}

export type DepartmentType = {
  departmentName: string
  departmentResponsiblePerson: string
  departmentCreatedAt: string
  departmentId: number
  departmentEmail: string
  departmentPhoneNumber: string
}

export type DepartmentsStateType = {
  isLoadProcess: boolean
  departments: Array<DepartmentType>
  isLoadedFirstTime: boolean
}

export interface FetchDepartmentsActionType extends Action {
  type: typeof departmentssActionTypeConstants.FETCH_DEPARTMENTS
  payload: number
}

export interface StartLoadingActionType extends Action {
  type: typeof departmentssActionTypeConstants.START_LOADING
}

export interface StopLoadingActionType extends Action {
  type: typeof departmentssActionTypeConstants.STOP_LOADING
}

export interface SetDepartmentsDataActionType extends Action {
  type: typeof departmentssActionTypeConstants.SET_DEPARTMENTS_DATA
  payload: Array<DepartmentType>
}

export type DepartmentsRootActionType =
  | FetchDepartmentsActionType
  | StartLoadingActionType
  | StopLoadingActionType
  | SetDepartmentsDataActionType
