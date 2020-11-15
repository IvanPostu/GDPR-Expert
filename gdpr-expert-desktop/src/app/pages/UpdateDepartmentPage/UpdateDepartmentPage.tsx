import { DepartmentForm } from '@/app/components/DepartmentForm'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type UpdateDepartmentPagePropType = RouteComponentProps

export class UpdateDepartmentPage extends Component<UpdateDepartmentPagePropType> {
  private _updateDepartmentId: number

  constructor(props: UpdateDepartmentPagePropType) {
    super(props)

    this._updateDepartmentId = Number(getUrlParameter(this.props.location.search, 'departmentId'))
  }

  render(): ReactElement {
    return (
      <DepartmentForm
        formType="update"
        {...this.props}
        updateDepartmentId={this._updateDepartmentId}
      />
    )
  }
}
