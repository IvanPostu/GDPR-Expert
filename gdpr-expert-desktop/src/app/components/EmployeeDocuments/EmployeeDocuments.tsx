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
import { removeDocumentsForEmployee } from '@/app/webApi/employee/removeDocument'
import { MessageBoxWrapper, MessageBoxWrapperPropType } from '../MessageBoxWrapper'
import { employeeAddDocumentsPageRedirect } from '@/app/pages/EmployeeAddDocumentsPage/employeeAddDocumentsPageRedirect'
import { employeeInfoPageRedirect } from '@/app/pages/EmployeeInfoPage/employeeInfoPageRedirect'
import { webServerURL } from '@/constants/webServerUrl'

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
  messageBox: MessageBoxWrapperPropType
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
    this.fetchDeleteDocumentForEmployee = this.fetchDeleteDocumentForEmployee.bind(this)

    this.state = {
      documents: [],
      isLoading: false,
      messageBox: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onOkClick: () => {},
        message: '',
        type: 'success',
      },
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
    employeeInfoPageRedirect({
      history: this.props.history,
      employeeId: this.props.employeeId,
    })
  }

  redirectToAddEmployeeDocumentsPage(): void {
    employeeAddDocumentsPageRedirect({
      history: this.props.history,
      employeeId: this.props.employeeId,
      employeeFirstName: this.props.employeeFirstName,
      employeeLastName: this.props.employeeLastName,
    })
  }

  downloadDocument(documentId: number, documentName: string): void {
    const url = `${webServerURL}/api/employee/docs?employeeId=${this.props.employeeId}&documentId=${documentId}`
    this.props.startDownloadActionCreator(url)
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

  fetchDeleteDocumentForEmployee(documentId: number): void {
    this.setState({ isLoading: true })
    removeDocumentsForEmployee({ documentId }).then((res) => {
      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        this.setState({
          messageBox: {
            message: 'Documentul a fost șters cu success.',
            onOkClick: () => {
              this.setState((prev) => ({ messageBox: { ...prev.messageBox, message: '' } }))
              this.fetchDocumentsInfoForEmployee()
            },
            type: 'success',
          },
        })
      }
      this.setState({ isLoading: false })
    })
  }

  render(): ReactElement {
    const { employeeFirstName, employeeLastName } = this.props
    const fullName = `${employeeFirstName} ${employeeLastName}`

    if (this.state.isLoading) return <FullWidthLoader />

    return (
      <MessageBoxWrapper {...this.state.messageBox}>
        <EmployeeDocumentsView
          deleteDocument={this.fetchDeleteDocumentForEmployee}
          downloadDocument={this.downloadDocument}
          documents={this.state.documents}
          redirectToAddEmployeeDocumentsPage={this.redirectToAddEmployeeDocumentsPage}
          redirectToEmployeeInfoPage={this.redirectToEmployeeInfoPage}
          employeeFullName={fullName}
        />
      </MessageBoxWrapper>
    )
  }
}

export const EmployeeDocuments = connect(null, mapDispatchToProps)(EmployeeDocumentsComponent)
