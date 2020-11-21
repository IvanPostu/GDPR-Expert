import { EmployeeForm } from '@/app/components/EmployeeForm'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type UpdateEmployeePagePropType = RouteComponentProps

export class UpdateEmployeePage extends Component<UpdateEmployeePagePropType> {
  private _updateEmployeeId: number

  constructor(props: UpdateEmployeePagePropType) {
    super(props)

    this._updateEmployeeId = Number(getUrlParameter(this.props.location.search, 'employeeId'))
  }

  render(): ReactElement {
    return <EmployeeForm {...this.props} type="update" updateEmployeeId={this._updateEmployeeId} />
  }
}
