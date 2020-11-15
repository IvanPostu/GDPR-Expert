import { DepartmentResponseType, getDepartment } from '@/app/webApi/department/getDepartment'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { FullWidthLoader } from '../BasicLoader'
import { DepartmentFormView } from './DepartmentFormView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'
import { DepartmentDataType } from './types'
import { updateDepartment } from '@/app/webApi/department/updateDepartment'
import { SuccessAlert } from '../CustomAlert/SuccessAlert/SuccessAlert'
import { ErrorAlert } from '../CustomAlert/ErrorAlert/ErrorAlert'
import { GlobalStateType } from '@/app/store'
import { createDepartment } from '@/app/webApi/department/createDepartment'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

function mapStateToProps(globalState: GlobalStateType) {
  return {
    organisationName: globalState.organisationInfoReducer.organisation.organisationName,
    organisationId: globalState.organisationInfoReducer.organisation.organisationId,
  }
}

type DepartmentFormPropType = RouteComponentProps & {
  formType: 'update' | 'create'
  updateDepartmentId?: number
} & ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

type DepartmentFormStateType = {
  department: DepartmentDataType
  isLoading: boolean
  successMessage: string
  errorMessage: string
}

class DepartmentFormComponent extends Component<DepartmentFormPropType, DepartmentFormStateType> {
  private _isMounted: boolean

  constructor(props: DepartmentFormPropType) {
    super(props)

    this._isMounted = false

    this.state = {
      errorMessage: '',
      successMessage: '',
      isLoading: false,
      department: {
        email: '',
        name: '',
        phone: '',
        responsiblePerson: '',
      },
    }

    this.fetchDepartment = this.fetchDepartment.bind(this)
    this.setDepartmentData = this.setDepartmentData.bind(this)
    this.submit = this.submit.bind(this)
    this.fetchUpdateDepartment = this.fetchUpdateDepartment.bind(this)
    this.handleFetchErrors = this.handleFetchErrors.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true

    if (this.props.formType === 'update') {
      const updateDepartmentId = this.props.updateDepartmentId || 0
      if (updateDepartmentId !== 0) {
        this.setState({ isLoading: true })
        this.fetchDepartment(updateDepartmentId)
      }
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  fetchDepartment(departmentId: number) {
    getDepartment(departmentId).then((res) => {
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const data = res as DepartmentResponseType
        this.setState({
          isLoading: false,
          department: {
            email: data.departmentEmail,
            name: data.departmentName,
            phone: data.departmentPhoneNumber,
            responsiblePerson: data.departmentResponsiblePerson,
          },
        })
      } else {
        const err = res as UnsuccessResponseData
        this.handleFetchErrors(err)
      }
    })
  }

  setDepartmentData(data: DepartmentDataType) {
    this.setState({
      department: data,
    })
  }

  fetchUpdateDepartment() {
    this.setState({ isLoading: true })
    const { email, name, phone, responsiblePerson } = this.state.department
    updateDepartment({
      email,
      id: this.props.updateDepartmentId as number,
      name,
      phoneNumber: phone,
      responsiblePerson,
    }).then((res) => {
      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        // const data = res as number
        this.setState({
          successMessage: 'Departamentul a fost modificat.',
          isLoading: false,
        })
      } else {
        const err = res as UnsuccessResponseData
        this.handleFetchErrors(err)
      }
    })
  }

  fetchCreateDepartment() {
    this.setState({ isLoading: true })
    const { email, name, phone, responsiblePerson } = this.state.department
    createDepartment({
      email,
      name,
      organisationId: Number(this.props.organisationId),
      phoneNumber: phone,
      responsiblePerson,
    }).then((res) => {
      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        this.setState({
          successMessage: 'Departamentul a fost creat.',
          isLoading: false,
        })
      } else {
        const err = res as UnsuccessResponseData
        this.handleFetchErrors(err)
      }
    })
  }

  handleFetchErrors(err: UnsuccessResponseData) {
    if (err.isSessionExpired) {
      this.props.clearAuthDataActionCreator()
    } else {
      this.setState({
        errorMessage: 'A apărut eroare, acțiunea realizată nu a avut loc.',
        isLoading: false,
      })
    }
  }

  submit(e: SyntheticEvent) {
    e.preventDefault()
    if (this.props.formType === 'update') {
      this.fetchUpdateDepartment()
    }

    if (this.props.formType === 'create') {
      this.fetchCreateDepartment()
    }
  }

  render(): ReactElement {
    if (this.state.isLoading) return <FullWidthLoader />

    if (this.state.successMessage)
      return (
        <SuccessAlert
          onOkClick={() => {
            this.props.history.goBack()
          }}
          text={this.state.successMessage}
        />
      )

    if (this.state.errorMessage)
      return (
        <ErrorAlert
          onOkClick={() => {
            this.setState({
              errorMessage: '',
              successMessage: '',
            })
          }}
          text={this.state.errorMessage}
        />
      )

    return (
      <DepartmentFormView
        organisationName={this.props.organisationName}
        onSubmit={this.submit}
        setDepartmentData={this.setDepartmentData}
        department={this.state.department}
        formType={this.props.formType}
      />
    )
  }
}

export const DepartmentForm = connect(mapStateToProps, mapDispatchToProps)(DepartmentFormComponent)
