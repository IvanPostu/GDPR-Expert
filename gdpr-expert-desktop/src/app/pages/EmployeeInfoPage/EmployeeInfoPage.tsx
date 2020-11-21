import EmployeeInfo from '@/app/components/EmployeeInfo/EmployeeInfo'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type EmployeeInfoPagePropType = RouteComponentProps

export class EmployeeInfoPage extends Component<EmployeeInfoPagePropType> {
  private _employeeId: number

  constructor(props: EmployeeInfoPagePropType) {
    super(props)

    this._employeeId = Number(getUrlParameter(this.props.location.search, 'employeeId'))

    if (!this._employeeId) throw new Error(`EmployeeInfoPage employeeId is unknown!!!`)
  }

  render(): ReactElement {
    return <EmployeeInfo employeeId={this._employeeId} />
  }
}

export default EmployeeInfoPage
