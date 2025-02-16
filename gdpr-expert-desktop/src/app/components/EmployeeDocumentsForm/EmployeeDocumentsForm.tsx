import { employeeDocumentsPageRedirect } from '@/app/pages/EmployeeDocumentsPage/employeeDocumentsPageRedirect'
import { addDocumentsForEmployee } from '@/app/webApi/employee/addDocumentsForEmployee'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import { nanoid } from 'nanoid'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FullWidthLoader } from '../BasicLoader'
import { MessageBoxWrapper, MessageBoxWrapperPropType } from '../MessageBoxWrapper'
import { EmployeeDocumentsFormUI } from './EmployeeDocumentsFormUI'

type EmployeeDocumentsFormComponentPropType = RouteComponentProps & {
  employeeId: number
  employeeFirstName: string
  employeeLastName: string
}

type EmployeeDocumentsFormComponentStateType = {
  files: Array<{
    file: File
    id: string
  }>
  isLoading: boolean
  messageBox: MessageBoxWrapperPropType
}

class EmployeeDocumentsFormComponent extends Component<
  EmployeeDocumentsFormComponentPropType,
  EmployeeDocumentsFormComponentStateType
> {
  private _isMounted = false

  constructor(props: EmployeeDocumentsFormComponentPropType) {
    super(props)

    this.state = {
      files: [],
      isLoading: false,
      messageBox: {
        message: '',
        onOkClick: this.clearMessageBox,
        type: 'success',
      },
    }

    this.onSumbit = this.onSumbit.bind(this)
    this.onAddFiles = this.onAddFiles.bind(this)
    this.removeFile = this.removeFile.bind(this)
    this.saveDocuments = this.saveDocuments.bind(this)
    this.clearMessageBox = this.clearMessageBox.bind(this)
    this.redirectToDocuments = this.redirectToDocuments.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  clearMessageBox(): void {
    this.setState((prevState) => {
      this.setState({
        messageBox: { ...prevState.messageBox, message: '' },
      })
    })
  }

  onAddFiles(files: FileList): void {
    if (files === null) return
    const arr: Array<File> = []

    for (let i = 0; i < files.length; i++) {
      if (files.item(i) !== null) {
        arr.push(files?.item(i) as File)
      }
    }

    this.setState((prevState) => {
      const newArr: Array<{
        file: File
        id: string
      }> = arr.concat(prevState.files.map((a) => a.file)).map((item) => ({
        file: item,
        id: nanoid(),
      }))

      return {
        files: newArr,
      }
    })
  }

  redirectToDocuments(): void {
    employeeDocumentsPageRedirect({
      history: this.props.history,
      employeeId: this.props.employeeId,
      employeeFirstName: this.props.employeeFirstName,
      employeeLastName: this.props.employeeLastName,
    })
  }

  saveDocuments(): void {
    this.setState({
      isLoading: true,
    })
    addDocumentsForEmployee({
      documents: this.state.files.map((a) => a.file),
      employeeId: this.props.employeeId,
    }).then((res) => {
      if (!this._isMounted) return

      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        this.setState({
          isLoading: false,
          messageBox: {
            message: 'Documente adaugate cu success.',
            onOkClick: this.redirectToDocuments,
            type: 'success',
          },
        })
      } else {
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  onSumbit(e: SyntheticEvent): void {
    e.preventDefault()
    this.saveDocuments()
  }

  removeFile(id: string): void {
    this.setState((prevState) => {
      const newFiles: Array<{
        file: File
        id: string
      }> = prevState.files
        .filter((a) => a.id !== id)
        .map((item) => ({
          file: item.file,
          id: nanoid(),
        }))

      return {
        files: newFiles,
      }
    })
  }

  render(): ReactElement {
    const { employeeFirstName, employeeLastName } = this.props
    const fullName = `${employeeFirstName} ${employeeLastName}`

    if (this.state.isLoading) return <FullWidthLoader />

    return (
      <MessageBoxWrapper {...this.state.messageBox}>
        <EmployeeDocumentsFormUI
          remove={this.removeFile}
          files={this.state.files}
          onAddFiles={this.onAddFiles}
          onSubmit={this.onSumbit}
          employeeFullName={fullName}
        />
      </MessageBoxWrapper>
    )
  }
}

export const EmployeeDocumentsForm = EmployeeDocumentsFormComponent
