import { GlobalStateType } from '@/app/store'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { ButtonA } from '../Form/ButtonA'
import { FormCardA } from '../Form/FormCardA'
import { TextInputA } from '../Form/TextInputA'
// import styles from './styles.module.scss'

function mapStateToProps(globalState: GlobalStateType) {
  return {
    organisationName: globalState.organisationInfoReducer.organisation.organisationName,
  }
}

export type CreateDepartmentFormDataType = {
  orgEmail: string
  orgName: string
  orgPhone: string
  orgResponsible: string
}
type CreateDepartmentComponentPropType = {
  onSubmit: (data: CreateDepartmentFormDataType) => void
} & ReturnType<typeof mapStateToProps>

class CreateDepartmentComponent extends Component<
  CreateDepartmentComponentPropType,
  CreateDepartmentFormDataType
> {
  constructor(props: CreateDepartmentComponentPropType) {
    super(props)

    this.state = {
      orgEmail: '',
      orgName: '',
      orgPhone: '',
      orgResponsible: '',
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e: SyntheticEvent): void {
    e.preventDefault()
    this.props.onSubmit({ ...this.state })
  }

  render(): ReactElement {
    return (
      <FormCardA onSubmit={this.onSubmit}>
        <h1>Creare departament: </h1>
        <p>
          Pentru organizația: <b>{this.props.organisationName}</b>
        </p>

        <TextInputA
          labelname="Denumire:"
          onChange={(e) => this.setState({ orgName: e.target.value })}
        />
        <TextInputA
          labelname="Telefon:"
          onChange={(e) => this.setState({ orgPhone: e.target.value })}
        />
        <TextInputA
          type="email"
          labelname="Email:"
          onChange={(e) => this.setState({ orgEmail: e.target.value })}
        />
        <TextInputA
          labelname="Persoană responsabilă:"
          onChange={(e) => this.setState({ orgResponsible: e.target.value })}
        />
        <ButtonA type="submit" title="Salvează" />
      </FormCardA>
    )
  }
}

export const CreateDepartment = connect(mapStateToProps)(CreateDepartmentComponent)
