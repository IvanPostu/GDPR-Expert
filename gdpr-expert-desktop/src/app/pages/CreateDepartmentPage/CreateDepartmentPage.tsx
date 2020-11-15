import { DepartmentForm } from '@/app/components/DepartmentForm'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type CreateDepartmentPagePropType = RouteComponentProps
export class CreateDepartmentPage extends Component<CreateDepartmentPagePropType> {
  render(): ReactElement {
    return <DepartmentForm formType="create" {...this.props} />
  }
}
