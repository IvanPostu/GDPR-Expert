import { getEmployeeById, GetEmployeeResponse } from '@/app/webApi/employee/getEmployee'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { PureComponent, ReactElement } from 'react'
import { EmployeeInfoView } from './EmployeeInfoView'

export type EmployeeInfoDataType = {
  departmentId: number
  employeeId: number
  departmentName: string
  personalDataResponsible: boolean
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

type EmployeeInfoPropType = {
  readonly employeeId: number
}

export class EmployeeInfo extends PureComponent<EmployeeInfoPropType> {
  private _isMounted: boolean
  private _employeeInfo: EmployeeInfoDataType

  constructor(props: EmployeeInfoPropType) {
    super(props)
    this._isMounted = false

    this._employeeInfo = {
      address: '',
      departmentId: 0,
      departmentName: '',
      email: '',
      employeeId: 0,
      firstName: '',
      lastName: '',
      personalDataResponsible: false,
      phoneNumber: '',
    }

    this.fetchEmployeeInfo = this.fetchEmployeeInfo.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true

    this.fetchEmployeeInfo()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  fetchEmployeeInfo(): void {
    getEmployeeById(this.props.employeeId).then((res) => {
      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const {
          address,
          departmentName,
          email,
          firstName,
          employeeId,
          lastName,
          personalDataResponsible,
          phoneNumber,
          departmentId,
        } = res as GetEmployeeResponse

        this._employeeInfo = {
          address,
          departmentName,
          email,
          firstName,
          lastName,
          personalDataResponsible,
          phoneNumber,
          employeeId,
          departmentId,
        }

        this.forceUpdate()
      }
    })
  }

  render(): ReactElement {
    return <EmployeeInfoView {...this._employeeInfo} />
  }
}

export default EmployeeInfo
