import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { CreateDepartment, CreateDepartmentFormDataType } from '@/app/components/CreateDepartment'
import { createDepartment } from '@/app/webApi/department/createDepartment'
import { GlobalStateType } from '@/app/store'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import { SuccessAlert } from '@/app/components/CustomAlert/SuccessAlert/SuccessAlert'

function mapStateToProps(globalState: GlobalStateType) {
  return {
    organisationId: globalState.organisationInfoReducer.organisation.organisationId,
  }
}

type CreateDepartmentPageComponentPropType = PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps>

type CreateDepartmentPageComponentStateType = {
  redirectToDepartments: boolean
  successMessage: boolean
}

class CreateDepartmentPageComponent extends Component<
  CreateDepartmentPageComponentPropType,
  CreateDepartmentPageComponentStateType
> {
  private _isMounted: boolean

  constructor(props: CreateDepartmentPageComponentPropType) {
    super(props)
    this.state = {
      redirectToDepartments: false,
      successMessage: false,
    }
    this._isMounted = false

    this.onSuccessClick = this.onSuccessClick.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
  }

  createDepartmentWebApi = async (data: CreateDepartmentFormDataType) => {
    const departmentId = await createDepartment({
      email: data.orgEmail,
      name: data.orgName,
      phoneNumber: data.orgPhone,
      responsiblePerson: data.orgResponsible,
      organisationId: Number(this.props.organisationId),
    })

    if (UnsuccessResponseData.isUnsuccessResponseData(departmentId)) {
    }

    if (this._isMounted) {
      if (departmentId > 0) {
        this.setState({ successMessage: true })
      }
    }
  }

  onSuccessClick() {
    this.setState({
      redirectToDepartments: true,
    })
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  render(): ReactElement {
    if (this.props.organisationId === '0') {
      return <Redirect to={routeNames.OrgansationInfoPageRoute} />
    }

    if (this.state.redirectToDepartments) {
      return <Redirect to={routeNames.OrganisationDepartmentsPageRoute} />
    }

    if (this.state.successMessage) {
      return <SuccessAlert onOkClick={this.onSuccessClick} text="Departament creat cu success." />
    }

    return <CreateDepartment onSubmit={this.createDepartmentWebApi} />
  }
}

export const CreateDepartmentPage = connect(mapStateToProps)(CreateDepartmentPageComponent)
