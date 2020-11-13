import {
  CreateEmployeeView,
  EmployeeDataType,
} from '@/app/components/CreateEmployee/CreateEmployeeView'
import { ErrorAlert } from '@/app/components/CustomAlert/ErrorAlert/ErrorAlert'
import { SuccessAlert } from '@/app/components/CustomAlert/SuccessAlert/SuccessAlert'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import { routeNames } from '@/app/routes/routeNames'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { addEmployee } from '@/app/webApi/employee/addEmployee'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type CreateEmployeePageComponentPropType = RouteComponentProps &
  ReturnType<typeof mapDispatchToProps>
type CreateEmployeePageComponentStateType = {
  departmentId: number
  departmentName: string
  errorMessage: string
  successMessage: string
}

class CreateEmployeePageComponent extends Component<
  CreateEmployeePageComponentPropType,
  CreateEmployeePageComponentStateType
> {
  constructor(props: CreateEmployeePageComponentPropType) {
    super(props)

    const departmentId = Number(getUrlParameter(this.props.location.search, 'departmentId'))
    const departmentName = getUrlParameter(this.props.location.search, 'departmentName')
    this.state = {
      departmentId,
      departmentName,
      errorMessage: '',
      successMessage: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data: EmployeeDataType): void {
    const { address, email, firstName, lastName, personalDataResponsible, phoneNumber } = data

    addEmployee({
      departmentId: this.state.departmentId,
      address,
      email,
      firstName,
      lastName,
      personalDataResponsible,
      phoneNumber,
    }).then((res) => {
      if (UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const data = res as UnsuccessResponseData
        if (data.isSessionExpired) {
          this.props.clearAuthDataActionCreator()
        } else {
          this.setState({ errorMessage: 'A apărut eroare la procesarea cererii.' })
        }
        return
      } else {
        this.setState({ successMessage: 'Angajantul dat a fost adaugat cu succes.' })
      }
    })
  }

  render(): ReactElement {
    if (this.state.errorMessage) {
      return (
        <ErrorAlert text={this.state.errorMessage} onOkClick={() => this.props.history.goBack()} />
      )
    }

    if (this.state.successMessage) {
      return (
        <SuccessAlert
          text={this.state.successMessage}
          onOkClick={() =>
            this.props.history.push({
              pathname: routeNames.DepartmentPage,
              search: `?departmentId=${this.state.departmentId}`,
            })
          }
        />
      )
    }

    return (
      <CreateEmployeeView departmentName={this.state.departmentName} onSubmit={this.onSubmit} />
    )
  }
}

export const CreateEmployeePage = connect(null, mapDispatchToProps)(CreateEmployeePageComponent)
