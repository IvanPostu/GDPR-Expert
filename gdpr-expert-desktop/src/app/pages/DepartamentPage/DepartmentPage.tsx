import { DepartmentInfo } from '@/app/components/DepartmentInfo'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type DepartmentPageComponentPropType = RouteComponentProps
type DepartmentPageComponentStateType = {
  departmentId: number
}

class DepartmentPageComponent extends Component<
  DepartmentPageComponentPropType,
  DepartmentPageComponentStateType
> {
  constructor(props: DepartmentPageComponentPropType) {
    super(props)

    const departmentIdStr = getUrlParameter(props.location.search, 'departmentId')
    const departmentId = Number(departmentIdStr)
    this.state = {
      departmentId,
    }
  }

  render(): ReactElement {
    return <DepartmentInfo departmentId={this.state.departmentId} />
  }
}

export const DepartmentPage = DepartmentPageComponent
