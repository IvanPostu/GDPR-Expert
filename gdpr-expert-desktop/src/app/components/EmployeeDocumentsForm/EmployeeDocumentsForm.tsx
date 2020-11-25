import { nanoid } from 'nanoid'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
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
}

class EmployeeDocumentsFormComponent extends Component<
  EmployeeDocumentsFormComponentPropType,
  EmployeeDocumentsFormComponentStateType
> {
  constructor(props: EmployeeDocumentsFormComponentPropType) {
    super(props)

    this.state = {
      files: [],
    }

    this.onSumbit = this.onSumbit.bind(this)
    this.onAddFiles = this.onAddFiles.bind(this)
    this.removeFile = this.removeFile.bind(this)
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

  onSumbit(e: SyntheticEvent): void {
    e.preventDefault()
    console.log(this.state.files)
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

    return (
      <EmployeeDocumentsFormUI
        remove={this.removeFile}
        files={this.state.files}
        onAddFiles={this.onAddFiles}
        onSubmit={this.onSumbit}
        employeeFullName={fullName}
      />
    )
  }
}

export const EmployeeDocumentsForm = EmployeeDocumentsFormComponent
