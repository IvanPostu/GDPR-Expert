import { bindActionCreators, Dispatch } from 'redux'
import React, { Component, ReactElement, PropsWithChildren } from 'react'
import { connect } from 'react-redux'

import { LoginPageView } from './LoginPageView'
import { LoginFormDataType } from './types'
import {
  fetchLoginActionCreator,
  clearMessageActionCreator,
} from '@/app/store/Authentication/actionCreators'
import { GlobalStateType } from '@/app/store'
import { Redirect } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'

function mapStateToProps(state: GlobalStateType) {
  return {
    isLoadProcess: state.authenticationReducer.isLoadProcess,
    isAuthenticated: state.authenticationReducer.isAuthenticated,

    message: state.authenticationReducer.message,
    messageStatus: state.authenticationReducer.messageStatus,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { fetchLoginActionCreator, clearMessageActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type LoginPagePropType = PropsWithChildren<unknown> &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

class LoginPageContainer extends Component<LoginPagePropType> {
  constructor(props: LoginPagePropType) {
    super(props)

    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(data: LoginFormDataType): void {
    this.props.fetchLoginActionCreator(data.email, data.password)
  }

  render(): ReactElement {
    if (this.props.isAuthenticated) {
      return <Redirect to={routeNames.OrganisationsPageRoute} />
    }

    return (
      <LoginPageView
        clearErrorMessage={this.props.clearMessageActionCreator}
        submit={this.submitHandler}
        isLoad={this.props.isLoadProcess}
        errorMessage={this.props.message}
      />
    )
  }
}

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer)
