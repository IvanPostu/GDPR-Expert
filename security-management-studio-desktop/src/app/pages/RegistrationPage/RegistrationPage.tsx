import React, { Component, ReactElement, PropsWithChildren } from 'react'
import { RegistrationPageView } from './RegistrationPageView'
import { RegistrationFormData } from './types'

type RegistrationPagePropType = PropsWithChildren<unknown>

export class RegistrationPage extends Component<RegistrationPagePropType> {
  constructor(props: RegistrationPagePropType) {
    super(props)

    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(data: RegistrationFormData): void {
    // console.log(data)
  }

  render(): ReactElement {
    return <RegistrationPageView submit={this.submitHandler} />
  }
}
