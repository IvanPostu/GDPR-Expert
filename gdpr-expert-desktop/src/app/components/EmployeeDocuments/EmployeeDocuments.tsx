import { routeNames } from '@/app/routes/routeNames'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { EmployeeDocumentsView } from './EmployeeDocumentsView'
import { startDownloadActionCreator } from '@/app/store/Downloads/actionCreators'
import { connect } from 'react-redux'
import {
  EmployeeDocumentInfoType,
  employeeDocumentsInfo,
} from '@/app/webApi/employee/employeeDocumentsInfo'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import { FullWidthLoader } from '../BasicLoader'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { startDownloadActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type EmployeeDocumentsComponentPropType = RouteComponentProps & {
  employeeId: number
  employeeFirstName: string
  employeeLastName: string
} & ReturnType<typeof mapDispatchToProps>

type EmployeeDocumentsComponentStateType = {
  documents: Array<{
    documentId: number
    filename: string
  }>
  isLoading: boolean
}

class EmployeeDocumentsComponent extends Component<
  EmployeeDocumentsComponentPropType,
  EmployeeDocumentsComponentStateType
> {
  private _isMounted = false

  constructor(props: EmployeeDocumentsComponentPropType) {
    super(props)

    this.redirectToEmployeeInfoPage = this.redirectToEmployeeInfoPage.bind(this)
    this.redirectToAddEmployeeDocumentsPage = this.redirectToAddEmployeeDocumentsPage.bind(this)
    this.downloadDocument = this.downloadDocument.bind(this)
    this.fetchDocumentsInfoForEmployee = this.fetchDocumentsInfoForEmployee.bind(this)

    this.state = {
      documents: [],
      isLoading: false,
    }
  }

  componentDidMount(): void {
    this._isMounted = true
    this.fetchDocumentsInfoForEmployee()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  redirectToEmployeeInfoPage(): void {
    this.props.history.push({
      pathname: routeNames.EmployeeInfoPageRoute,
      search: `?employeeId=${this.props.employeeId}`,
    })
  }

  redirectToAddEmployeeDocumentsPage(): void {
    const searchValue = `?employeeId=${this.props.employeeId}&employeeLastName=${this.props.employeeLastName}&employeeFirstName=${this.props.employeeFirstName}`

    this.props.history.push({
      pathname: routeNames.EmployeeAddDocumentsPageRoute,
      search: searchValue,
    })
  }

  downloadDocument(documentId: number, documentName: string): void {
    this.props.startDownloadActionCreator(
      `http://127.0.0.1:8080/gdpr-expert-web/api/employee/docs?employeeId=${this.props.employeeId}&documentId=${documentId}`,
      documentName,
    )
  }

  fetchDocumentsInfoForEmployee(): void {
    this.setState({ isLoading: true })
    employeeDocumentsInfo(this.props.employeeId).then((res) => {
      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const arr = res as EmployeeDocumentInfoType[]
        this.setState({ documents: arr })
      }
      this.setState({ isLoading: false })
    })
  }

  render(): ReactElement {
    const { employeeFirstName, employeeLastName } = this.props
    const fullName = `${employeeFirstName} ${employeeLastName}`

    if (this.state.isLoading) return <FullWidthLoader />

    return (
      <EmployeeDocumentsView
        downloadDocument={this.downloadDocument}
        documents={this.state.documents}
        redirectToAddEmployeeDocumentsPage={this.redirectToAddEmployeeDocumentsPage}
        redirectToEmployeeInfoPage={this.redirectToEmployeeInfoPage}
        employeeFullName={fullName}
      />
    )
  }
}

export const EmployeeDocuments = connect(null, mapDispatchToProps)(EmployeeDocumentsComponent)
