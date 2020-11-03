import React, { Component, ReactElement, PropsWithChildren } from 'react'

import { LoginPageView } from './LoginPageView'
import { LoginFormDataType } from './types'
import { loginUser } from '@/app/webApi/auth/login'

type LoginPagePropType = PropsWithChildren<unknown>

class LoginPageComponent extends Component<LoginPagePropType> {
  constructor(props: LoginPagePropType) {
    super(props)

    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount(): void {
    loginUser('b@mail.ru', 'q').then((a) => console.log(a))
  }

  submitHandler(data: LoginFormDataType): void {}

  render(): ReactElement {
    return <LoginPageView submit={this.submitHandler} isLoad={false} />
  }
}

export const LoginPage = LoginPageComponent
