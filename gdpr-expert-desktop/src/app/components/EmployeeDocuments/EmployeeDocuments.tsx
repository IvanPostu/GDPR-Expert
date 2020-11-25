import { routeNames } from '@/app/routes/routeNames'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { EmployeeDocumentsView } from './EmployeeDocumentsView'

type EmployeeDocumentsComponentPropType = RouteComponentProps & {
  employeeId: number
  employeeFirstName: string
  employeeLastName: string
}

class EmployeeDocumentsComponent extends Component<EmployeeDocumentsComponentPropType> {
  constructor(props: EmployeeDocumentsComponentPropType) {
    super(props)

    this.redirectToEmployeeInfoPage = this.redirectToEmployeeInfoPage.bind(this)
    this.redirectToAddEmployeeDocumentsPage = this.redirectToAddEmployeeDocumentsPage.bind(this)
  }

  redirectToEmployeeInfoPage(): void {
    this.props.history.push({
      pathname: routeNames.EmployeeInfoPageRoute,
      search: `?employeeId=${this.props.employeeId}`,
    })
  }

  redirectToAddEmployeeDocumentsPage(): void {
    const searchValue = `?employeeId=${this.props.employeeId}&employeeLastName=${this.props.employeeLastName}&employeeFirstName=${this.props.employeeFirstName}`

    // console.log(searchValue)

    this.props.history.push({
      pathname: routeNames.EmployeeAddDocumentsPageRoute,
      search: searchValue,
    })
  }

  render(): ReactElement {
    const { employeeFirstName, employeeLastName } = this.props
    const fullName = `${employeeFirstName} ${employeeLastName}`

    return (
      <EmployeeDocumentsView
        redirectToAddEmployeeDocumentsPage={this.redirectToAddEmployeeDocumentsPage}
        redirectToEmployeeInfoPage={this.redirectToEmployeeInfoPage}
        employeeFullName={fullName}
      />
    )
  }
}

export const EmployeeDocuments = EmployeeDocumentsComponent
