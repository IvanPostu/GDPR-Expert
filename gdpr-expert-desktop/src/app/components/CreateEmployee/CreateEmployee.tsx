import React, { ChangeEvent, Component, ReactElement } from 'react'
import { CreateEmployeeView, EmployeeDataType } from './CreateEmployeeView'
import { DataResponsibleQuestions } from './DataResponsibleQuestions'

type CreateEmployeePropType = {
  onSubmit: (data: EmployeeDataType) => void
  departmentName: string
}

type CreateEmployeeStateType = {
  personalDataResponsible: boolean
  redirectToQuestions: boolean
}

export class CreateEmployee extends Component<CreateEmployeePropType, CreateEmployeeStateType> {
  constructor(props: CreateEmployeePropType) {
    super(props)

    this.state = {
      personalDataResponsible: false,
      redirectToQuestions: false,
    }

    this.onPersonalDataResponsibleCheckboxClick = this.onPersonalDataResponsibleCheckboxClick.bind(
      this,
    )
  }

  onPersonalDataResponsibleCheckboxClick(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ redirectToQuestions: true })
  }

  render(): ReactElement {
    if (this.state.redirectToQuestions) {
      return <DataResponsibleQuestions />
    }

    return (
      <CreateEmployeeView
        onPersonalDataResponsibleCheckboxClick={this.onPersonalDataResponsibleCheckboxClick}
        personalDataResponsibleChecked={this.state.personalDataResponsible}
        departmentName={this.props.departmentName}
        onSubmit={this.props.onSubmit}
      />
    )
  }
}
