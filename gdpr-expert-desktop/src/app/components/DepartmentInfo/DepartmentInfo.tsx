import { GlobalStateType } from '@/app/store'
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

type DepartmentInfoComponentStateType = {
  departmentInfo: { [key: string]: string }
  departmentName: string
}

class DepartmentInfoComponent extends PureComponent<
  DepartmentInfoComponentPropType,
  DepartmentInfoComponentStateType
> {
  constructor(props: DepartmentInfoComponentPropType) {
    super(props)
    const departament = this.props.departments[this.props.departmentId]

    this.state = {
      departmentName: departament.departmentName,
      departmentInfo: {
        Email: departament.departmentEmail,
        'Data creării': departament.departmentCreatedAt,
        'Numărul de telefon': departament.departmentPhoneNumber,
        'Persoana responsabilă': departament.departmentResponsiblePerson,
      },
    }
  }

  render(): ReactElement {
    return (
      <DepartmentInfoView
        departmentInfo={this.state.departmentInfo}
        departmentName={this.state.departmentName}
        departmentId={this.props.departmentId}
      />
    )
  }
}

export const DepartmentInfo = connect(mapStateToProps)(DepartmentInfoComponent)
