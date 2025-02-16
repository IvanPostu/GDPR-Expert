import { getUrlParameter } from '@/app/routes/getUrlParameter'
import { addEmployee } from '@/app/webApi/employee/addEmployee'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { FullWidthLoader } from '../BasicLoader'
import { ErrorAlert } from '../CustomAlert/ErrorAlert/ErrorAlert'
import { SuccessAlert } from '../CustomAlert/SuccessAlert/SuccessAlert'
import { EmployeeFormView } from './EmployeeFormView'
import { EmployeeType } from './types'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'
import { getEmployeeById, GetEmployeeResponse } from '@/app/webApi/employee/getEmployee'
import { updateEmployee } from '@/app/webApi/employee/updateEmployee'
import { EmployeeDataResponsibleQuestions } from '../EmployeeDataResponsibleQuestions/EmployeeDataResponsibleQuestions'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type EmployeeFormPropType = {
  type: 'update' | 'create'
  updateEmployeeId?: number
} & RouteComponentProps &
  ReturnType<typeof mapDispatchToProps>

type EmployeeFormStateType = {
  errorMessage: string
  successMessage: string
  isLoading: boolean
  employeeData: EmployeeType
  redirectToQuestions: boolean
}

class EmployeeFormComponent extends Component<EmployeeFormPropType, EmployeeFormStateType> {
  private _departmentId: number
  private _departmentName: string
  private _employeeId: number
  private _isMounted: boolean

  constructor(props: EmployeeFormPropType) {
    super(props)
    this._departmentId = Number(getUrlParameter(this.props.location.search, 'departmentId'))
    this._departmentName = getUrlParameter(this.props.location.search, 'departmentName')
    this._isMounted = false
    this._employeeId = 0

    if (!this._departmentId || !this._departmentName)
      throw new Error('Invalid searchParams for EmployeeFormComponent')

    this.state = {
      redirectToQuestions: false,
      isLoading: false,
      errorMessage: '',
      successMessage: '',
      employeeData: {
        address: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        personalDataResponsible: false,
      },
    }

    this.setEmployeeData = this.setEmployeeData.bind(this)
    this.submit = this.submit.bind(this)
    this.fetchCreateEmployee = this.fetchCreateEmployee.bind(this)
    this.handleFetchErrors = this.handleFetchErrors.bind(this)
    this.fetchEmployeeData = this.fetchEmployeeData.bind(this)
    this.fetchUpdateEmployee = this.fetchUpdateEmployee.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true

    if (this.props.type === 'update') {
      this._employeeId = Number(getUrlParameter(this.props.location.search, 'employeeId'))
      this.setState({ isLoading: true })

      if (!this._employeeId) throw new Error('Update employee, unknown employee id')
      this.fetchEmployeeData(this._employeeId)
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  fetchEmployeeData(employeeId: number) {
    getEmployeeById(employeeId).then((res) => {
      if (!this._isMounted) return

      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const {
          address,
          email,
          firstName,
          lastName,
          personalDataResponsible,
          phoneNumber,
        } = res as GetEmployeeResponse
        this.setState((prevState) => ({
          ...prevState,
          employeeData: {
            email,
            address,
            firstName,
            lastName,
            personalDataResponsible,
            phoneNumber,
          },
        }))
      } else {
        const err = res as UnsuccessResponseData
        this.handleFetchErrors(err)
      }

      this.setState({
        isLoading: false,
      })
    })
  }

  setEmployeeData(data: EmployeeType): void {
    this.setState({ employeeData: data })
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

  fetchCreateEmployee(): void {
    const {
      address,
      email,
      firstName,
      lastName,
      personalDataResponsible,
      phoneNumber,
    } = this.state.employeeData
    addEmployee({
      address,
      email,
      firstName,
      lastName,
      phoneNumber,
      personalDataResponsible,
      departmentId: this._departmentId,
    }).then((res) => {
      if (!this._isMounted) return
      if (UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const err = res as UnsuccessResponseData
        this.handleFetchErrors(err)
      } else {
        this.setState({ successMessage: 'Angajat a fost creat!' })
      }

      this.setState({ isLoading: false })
    })
  }

  fetchUpdateEmployee() {
    const {
      address,
      email,
      firstName,
      lastName,
      personalDataResponsible,
      phoneNumber,
    } = this.state.employeeData

    updateEmployee({
      id: this._employeeId,
      address,
      email,
      firstName,
      lastName,
      personalDataResponsible,
      phoneNumber,
    }).then((res) => {
      if (!this._isMounted) return
      if (UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const err = res as UnsuccessResponseData
        this.handleFetchErrors(err)
      } else {
        this.setState({ successMessage: 'Datele despre angajat au fost modificate!' })
      }

      this.setState({ isLoading: false })
    })
  }

  submit(e: SyntheticEvent): void {
    e.preventDefault()
    this.setState({ isLoading: true })
    if (this.props.type === 'create') {
      this.fetchCreateEmployee()
    }

    if (this.props.type === 'update') {
      this.fetchUpdateEmployee()
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

    if (this.state.redirectToQuestions) {
      return (
        <EmployeeDataResponsibleQuestions
          setPersonalDataResponsible={(resp) =>
            this.setState({
              employeeData: { ...this.state.employeeData, personalDataResponsible: resp },
              redirectToQuestions: false,
            })
          }
        />
      )
    }

    return (
      <EmployeeFormView
        redirectToQuestions={() => this.setState({ redirectToQuestions: true })}
        setEmployeeData={this.setEmployeeData}
        onSubmit={this.submit}
        departmentName={this._departmentName}
        type={this.props.type}
        employee={this.state.employeeData}
      />
    )
  }
}

export const EmployeeForm = connect(null, mapDispatchToProps)(EmployeeFormComponent)
