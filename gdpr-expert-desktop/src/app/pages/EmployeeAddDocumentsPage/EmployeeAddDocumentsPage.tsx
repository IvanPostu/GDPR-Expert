import { EmployeeDocumentsForm } from '@/app/components/EmployeeDocumentsForm/EmployeeDocumentsForm'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type EmployeeAddDocumentsPagePropType = RouteComponentProps

export class EmployeeAddDocumentsPage extends Component<EmployeeAddDocumentsPagePropType> {
  private _employeeId: number
  private _employeeLastName: string
  private _employeeFirstName: string

  constructor(props: EmployeeAddDocumentsPagePropType) {
    super(props)

    this._employeeId = Number(getUrlParameter(this.props.location.search, 'employeeId'))
    this._employeeLastName = getUrlParameter(this.props.location.search, 'employeeLastName')
    this._employeeFirstName = getUrlParameter(this.props.location.search, 'employeeFirstName')

    const arr = [this._employeeId, this._employeeLastName, this._employeeFirstName]
    arr.forEach((a) => {
      if (!a) {
        throw new Error(`EmployeeAddDocumentsPage invalid url params: ${arr}`)
      }
    })
  }

  render(): ReactElement {
    return (
      <EmployeeDocumentsForm
        employeeFirstName={this._employeeFirstName}
        employeeId={this._employeeId}
        employeeLastName={this._employeeLastName}
        {...this.props}
      />
    )
  }
}
