import { routeNames } from '@/app/routes/routeNames'
import { getEmployeeById, GetEmployeeResponse } from '@/app/webApi/employee/getEmployee'
import { removeEmployeeById } from '@/app/webApi/employee/removeEmployee'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { PureComponent, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FullWidthLoader } from '../BasicLoader'
import { ErrorAlert } from '../CustomAlert/ErrorAlert/ErrorAlert'
import { SuccessAlert } from '../CustomAlert/SuccessAlert/SuccessAlert'
import { EmployeeInfoView as EmployeeInfoUI } from './EmployeeInfoView'

export type EmployeeInfoDataType = {
  departmentId: number
  employeeId: number
  departmentName: string
  personalDataResponsible: boolean
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

type EmployeeInfoPropType = {
  readonly employeeId: number
} & RouteComponentProps

type EmployeeInfoStateType = {
  isLoading: boolean
  successMessage: string
  errorMessage: string
}

export class EmployeeInfo extends PureComponent<EmployeeInfoPropType, EmployeeInfoStateType> {
  private _isMounted: boolean
  private _employeeInfo: EmployeeInfoDataType

  constructor(props: EmployeeInfoPropType) {
    super(props)
    this._isMounted = false

    this._employeeInfo = {
      address: '',
      departmentId: 0,
      departmentName: '',
      email: '',
      employeeId: 0,
      firstName: '',
      lastName: '',
      personalDataResponsible: false,
      phoneNumber: '',
    }
    this.state = {
      errorMessage: '',
      isLoading: false,
      successMessage: '',
    }

    this.fetchEmployeeInfo = this.fetchEmployeeInfo.bind(this)
    this.fetchRemoveEmployee = this.fetchRemoveEmployee.bind(this)
    this.onUpdateClick = this.onUpdateClick.bind(this)
    this.onRemoveClick = this.onRemoveClick.bind(this)
    this.onShowDocumentsClick = this.onShowDocumentsClick.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true

    this.fetchEmployeeInfo()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  fetchEmployeeInfo(): void {
    this.setState({ isLoading: true })
    getEmployeeById(this.props.employeeId).then((res) => {
      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const {
          address,
          departmentName,
          email,
          firstName,
          employeeId,
          lastName,
          personalDataResponsible,
          phoneNumber,
          departmentId,
        } = res as GetEmployeeResponse

        this._employeeInfo = {
          address,
          departmentName,
          email,
          firstName,
          lastName,
          personalDataResponsible,
          phoneNumber,
          employeeId,
          departmentId,
        }

        this.forceUpdate()
      }
      this.setState({ isLoading: false })
    })
  }

  fetchRemoveEmployee(): void {
    this.setState({ isLoading: true })
    removeEmployeeById(this._employeeInfo.employeeId).then((res) => {
      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        this.setState({
          successMessage: 'Angajatul a fost șters cu success.',
        })
      } else {
        this.setState({
          errorMessage: 'Pe parcursul ștergerii datelor despre angajat a apărut eroare.',
        })
      }
      this.setState({ isLoading: false })
    })
  }

  onUpdateClick(): void {
    this.props.history.push({
      pathname: routeNames.UpdateEmployeePageRoute,
      search: `?employeeId=${this._employeeInfo.employeeId}&departmentId=${this._employeeInfo.departmentId}&departmentName=${this._employeeInfo.departmentName}`,
    })
  }

  onRemoveClick(): void {
    if (confirm('Sunteți sigur că doriți să ștergeți complet informația despre angajatul dat?')) {
      this.fetchRemoveEmployee()
    }
  }

  onShowDocumentsClick(): void {
    const searchValue = `?employeeId=${this.props.employeeId}&employeeLastName=${this._employeeInfo.lastName}&employeeFirstName=${this._employeeInfo.firstName}`

    // console.log(searchValue)

    this.props.history.push({
      pathname: routeNames.EmployeeDocumentsPageRoute,
      search: searchValue,
    })
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
      <EmployeeInfoUI
        onRemoveClick={this.onUpdateClick}
        onUpdateClick={this.onUpdateClick}
        onShowDocumentListClick={this.onShowDocumentsClick}
        {...this._employeeInfo}
      />
    )
  }
}

export default EmployeeInfo
