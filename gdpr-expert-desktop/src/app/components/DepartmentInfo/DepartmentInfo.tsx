import { GlobalStateType } from '@/app/store'
import { DepartmentType } from '@/app/store/Departments/types'
import {
  EmployeeForDepartmentResponseType,
  employeesForDepartment,
} from '@/app/webApi/employee/employeesForDepartment'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { PropsWithChildren, PureComponent, ReactElement } from 'react'
import { connect } from 'react-redux'
import { DepartmentInfoView } from './DepartmentInfoView'

function mapStateToProps(globalState: GlobalStateType) {
  return {
    departments: globalState.departmentsReducer.departments,
  }
}

type DepartmentInfoComponentPropType = PropsWithChildren<unknown> & {
  departmentId: number
} & ReturnType<typeof mapStateToProps>

type DepartmentEmployeesType = Array<{
  id: string
  fullName: string
  address: string
  email: string
  phone: string
  personalDataResponsible: string
}>

type DepartmentInfoComponentStateType = {
  departmentInfo: { [key: string]: string }
  departmentName: string
  departmentEmployeesFetching: boolean
  departmentEmployees: DepartmentEmployeesType
}

class DepartmentInfoComponent extends PureComponent<
  DepartmentInfoComponentPropType,
  DepartmentInfoComponentStateType
> {
  private _isMounted: boolean

  constructor(props: DepartmentInfoComponentPropType) {
    super(props)
    const departament = this.props.departments.find(
      (a) => a.departmentId === this.props.departmentId,
    ) as DepartmentType

    this.state = {
      departmentEmployeesFetching: true,
      departmentEmployees: [],
      departmentName: departament.departmentName,
      departmentInfo: {
        Email: departament.departmentEmail,
        'Data creării': departament.departmentCreatedAt.replace('T', ' '),
        'Numărul de telefon': departament.departmentPhoneNumber,
        'Persoana responsabilă': departament.departmentResponsiblePerson,
      },
    }
    this._isMounted = false
  }

  componentDidMount(): void {
    this._isMounted = true
    employeesForDepartment(this.props.departmentId).then((res) => {
      if (this._isMounted) {
        if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
          const employees = res as EmployeeForDepartmentResponseType[]
          const departmentEmployees: DepartmentEmployeesType = employees.map((a) => {
            return {
              id: String(a.id),
              fullName: `${a.firstName} ${a.lastName}`,
              address: a.address,
              email: a.email,
              phone: a.phoneNumber,
              personalDataResponsible: a.personalDataResponsible ? 'Da' : 'Nu',
            }
          })

          departmentEmployees.reverse()
          this.setState({ departmentEmployeesFetching: false, departmentEmployees })
        }
      }
    })
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  render(): ReactElement {
    return (
      <DepartmentInfoView
        departmentInfo={this.state.departmentInfo}
        departmentName={this.state.departmentName}
        departmentId={this.props.departmentId}
        departmentEmployees={this.state.departmentEmployees}
        departmentEmployeesFetching={this.state.departmentEmployeesFetching}
      />
    )
  }
}

export const DepartmentInfo = connect(mapStateToProps)(DepartmentInfoComponent)
