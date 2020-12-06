import { GlobalStateType } from '@/app/store'
import { DepartmentsResponseType, getDepartments } from '@/app/webApi/department/getDepartments'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { FullWidthLoader } from '../BasicLoader'
import { ProcessingActivityFormView } from './ProcessingActivityFormView'
import { DataProcessingStatus, ProcessingPersonalDataActivity } from './types'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { bindActionCreators, Dispatch } from 'redux'
import {
  EmployeeForDepartmentResponseType,
  employeesForDepartment,
} from '@/app/webApi/employee/employeesForDepartment'
import { MessageBoxWrapper, MessageBoxWrapperPropType } from '../MessageBoxWrapper'
import { routeNames } from '@/app/routes/routeNames'
import { createDataProcessingActivity } from '@/app/webApi/dataProcessingActivity/createDataProcessingActivity'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisationId: state.organisationInfoReducer.organisation.organisationId,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type ProcessingActivityFormComponentPropType = RouteComponentProps & {
  type: 'update' | 'create'
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type ProcessingActivityFormComponentStateType = {
  isLoad: boolean
  departmentsIsLoad: boolean
  employeesIsLoad: boolean
  activity: ProcessingPersonalDataActivity
  departments: Array<{ id: number; name: string }>
  departmentEmplyees: Array<{ firstname: string; lastname: string; id: number }>
  msg: MessageBoxWrapperPropType
}

class ProcessingActivityFormComponent extends Component<
  ProcessingActivityFormComponentPropType,
  ProcessingActivityFormComponentStateType
> {
  private _isMounted = false

  constructor(props: ProcessingActivityFormComponentPropType) {
    super(props)

    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    this.state = {
      isLoad: false,
      departmentsIsLoad: true,
      employeesIsLoad: false,
      departments: [],
      departmentEmplyees: [],
      activity: {
        organisationId: Number(this.props.organisationId),
        dataResponsibleEmployeeId: 0,
        departmentId: 0,
        activityName: '',
        dataOwner: '',
        beginningOfTheActivity: today.toISOString().split('T')[0],
        endOfTheActivity: tomorrow.toISOString().split('T')[0],
        dataIsSensible: false,
        description: '',
        purposes: '',
        status: DataProcessingStatus.WAIT,
      },
      msg: {
        message: '',
        onOkClick: alert,
        type: 'success',
      },
    }

    this.setActivityData = this.setActivityData.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.fetchDepartments = this.fetchDepartments.bind(this)
    this.fetchEmployeesForDepartment = this.fetchEmployeesForDepartment.bind(this)
    this.handleRequestError = this.handleRequestError.bind(this)
    this.clearMessage = this.clearMessage.bind(this)
    this.fetchSaveDataProcessingActivity = this.fetchSaveDataProcessingActivity.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
    this.fetchDepartments()
  }

  componentDidUpdate(
    prevProps: ProcessingActivityFormComponentPropType,
    prevState: ProcessingActivityFormComponentStateType,
  ): void {
    const fetchEmployeesCondition =
      prevState.activity.departmentId !== this.state.activity.departmentId &&
      this.state.activity.departmentId > 0
    if (fetchEmployeesCondition) {
      this.fetchEmployeesForDepartment(this.state.activity.departmentId)
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  setActivityData(newActivity: ProcessingPersonalDataActivity): void {
    this.setState({ activity: newActivity })
  }

  handleRequestError(err: UnsuccessResponseData): void {
    if (err.isSessionExpired) {
      this.props.clearAuthDataActionCreator()
    }
  }

  async fetchDepartments(): Promise<void> {
    const res = await getDepartments(Number(this.props.organisationId), true)
    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as DepartmentsResponseType
      const departments = data.map((a) => ({ id: a.departmentId, name: a.departmentName }))

      if (departments.length === 0) {
        this.setState({
          msg: {
            title: 'Eroare',
            message:
              'Organizația dată nu conține departamente, crearea activității de procesare a datelor este imposibilă!!!',
            onOkClick: this.clearMessage.bind(this, routeNames.OrgansationInfoPageRoute),
            type: 'error',
          },
        })
      } else {
        this.setState((prevState) => ({
          departmentsIsLoad: false,
          departments: departments,
          activity: { ...prevState.activity, departmentId: departments[0].id },
        }))
      }
    } else {
      this.handleRequestError(res as UnsuccessResponseData)
    }
  }

  async fetchEmployeesForDepartment(departmentId: number): Promise<void> {
    this.setState({ employeesIsLoad: true })
    const res = await employeesForDepartment(departmentId)

    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as Array<EmployeeForDepartmentResponseType>
      const responsibleEmployees = data
        .filter((a) => a.personalDataResponsible)
        .map((a) => ({
          firstname: a.firstName,
          lastname: a.lastName,
          id: a.id,
        }))

      if (responsibleEmployees.length === 0) {
        this.setState({
          employeesIsLoad: false,
          departmentEmplyees: responsibleEmployees,
        })
      } else {
        this.setState((prevState) => ({
          employeesIsLoad: false,
          departmentEmplyees: responsibleEmployees,
          activity: {
            ...prevState.activity,
            dataResponsibleEmployeeId: responsibleEmployees[0].id,
          },
        }))
      }
    } else {
      this.handleRequestError(res as UnsuccessResponseData)
    }
  }

  async fetchSaveDataProcessingActivity(): Promise<void> {
    const res = await createDataProcessingActivity(this.state.activity)
    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      this.setState({
        msg: {
          message: 'Activitate de procesare a datelor a fost creată cu success.',
          onOkClick: this.clearMessage.bind(this, routeNames.OrganisationPageRoute),
          type: 'success',
        },
      })
    } else {
      if ((res as UnsuccessResponseData).isSessionExpired) {
        this.props.clearAuthDataActionCreator()
      } else {
        this.setState({
          msg: {
            message: 'A apărut eroare în procesul creării activității de procesare a datelor..',
            onOkClick: this.clearMessage.bind(this, null),
            type: 'error',
          },
        })
      }
    }
  }

  onSubmit(e: SyntheticEvent): void {
    e.preventDefault()
    this.fetchSaveDataProcessingActivity()
  }

  clearMessage(redirectUrl: string | null): void {
    this.setState({ msg: { message: '', onOkClick: alert, type: 'success' } })
    if (redirectUrl) {
      this.props.history.push(redirectUrl)
    }
  }

  render(): ReactElement {
    if (this.state.isLoad) return <FullWidthLoader />

    return (
      <MessageBoxWrapper {...this.state.msg}>
        <ProcessingActivityFormView
          departmentsIsLoad={this.state.departmentsIsLoad}
          employeesIsLoad={this.state.employeesIsLoad}
          onSubmit={this.onSubmit}
          activity={this.state.activity}
          setActivityData={this.setActivityData}
          type={this.props.type}
          departments={this.state.departments}
          departmentEmplyees={this.state.departmentEmplyees}
        />
      </MessageBoxWrapper>
    )
  }
}

export const ProcessingActivityForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProcessingActivityFormComponent)
