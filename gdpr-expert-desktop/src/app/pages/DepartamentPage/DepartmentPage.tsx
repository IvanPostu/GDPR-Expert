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
    this.state = {
      departmentId: 0,
    }
  }

  componentDidMount(): void {
    const departmentIdStr = getUrlParameter(this.props.location.search, 'departmentId')
    const departmentId = Number(departmentIdStr)

    this.setState({ departmentId })
  }

  render(): ReactElement {
    return <DepartmentInfo departmentId={this.state.departmentId} />
  }
}

export const DepartmentPage = DepartmentPageComponent
