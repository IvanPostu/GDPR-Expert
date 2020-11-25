import { EmployeeDocuments } from '@/app/components/EmployeeDocuments'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type EmployeeDocumentsPagePropType = RouteComponentProps

export class EmployeeDocumentsPage extends Component<EmployeeDocumentsPagePropType> {
  private _employeeId: number
  private _employeeLastName: string
  private _employeeFirstName: string

  constructor(props: EmployeeDocumentsPagePropType) {
    super(props)

    this._employeeId = Number(getUrlParameter(this.props.location.search, 'employeeId'))
    this._employeeLastName = getUrlParameter(this.props.location.search, 'employeeLastName')
    this._employeeFirstName = getUrlParameter(this.props.location.search, 'employeeFirstName')

    const arr = [this._employeeId, this._employeeLastName, this._employeeFirstName]
    arr.forEach((a) => {
      if (!a) {
        throw new Error(`EmployeeDocumentsPage invalid url params: ${arr}`)
      }
    })
  }

  render(): ReactElement {
    return (
      <EmployeeDocuments
        employeeId={this._employeeId}
        employeeFirstName={this._employeeFirstName}
        employeeLastName={this._employeeLastName}
        {...this.props}
      />
    )
  }
}
