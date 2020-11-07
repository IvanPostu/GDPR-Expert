import { routeNames } from '@/app/routes/routeNames'
import { GlobalStateType } from '@/app/store'
import {
  clearMessageActionCreator,
  fetchLoginActionCreator,
} from '@/app/store/Authentication/actionCreators'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { LoginPageView } from './LoginPageView'
import { LoginFormDataType } from './types'

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
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps

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
