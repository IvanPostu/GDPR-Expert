import { EmployeeForm } from '@/app/components/EmployeeForm'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type CreateEmployeePagePropType = RouteComponentProps
export class CreateEmployeePage extends Component<CreateEmployeePagePropType> {
  render(): ReactElement {
    return <EmployeeForm type="create" {...this.props} />
  }
}
