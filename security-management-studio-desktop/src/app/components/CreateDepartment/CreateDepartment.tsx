import React, { Component, ReactElement } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { FormCardA } from '../Form/FormCardA'
import { TextInputA } from '../Form/TextInputA'
// import styles from './styles.module.scss'

type DepartmentFormDataType = {
  orgEmail: string
  orgName: string
  orgPhone: string
  orgResponsible: string
}
type CreateDepartmentComponentPropType = {
  onSubmit: (data: DepartmentFormDataType) => void
}

class CreateDepartmentComponent extends Component<CreateDepartmentComponentPropType> {
  constructor(props: CreateDepartmentComponentPropType) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data: DepartmentFormDataType) {}

  render(): ReactElement {
    return (
      <FormCardA onSubmit={() => {}}>
        <h1>Creare departament: </h1>
        <p>Pentru organizația: AKDjdjkfajklfjakdfjkad</p>

        <TextInputA labelName="Denumire:" onTextChange={(str: string) => {}} />
        <TextInputA labelName="Telefon:" onTextChange={(str: string) => {}} />
        <TextInputA type="email" labelName="Email:" onTextChange={(str: string) => {}} />
        <TextInputA labelName="Persoană responsabilă:" onTextChange={(str: string) => {}} />
        <ButtonA type="submit" title="Salvează" />
      </FormCardA>
    )
  }
}

export const CreateDepartment = CreateDepartmentComponent
