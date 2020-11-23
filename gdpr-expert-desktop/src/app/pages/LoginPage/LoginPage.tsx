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
import { ipcRenderer } from 'electron'
import { DownloadOptionType } from '@/electron/downloadApi/DownloadOption'

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

  componentDidMount(): void {
    // const GB = 'http://tegos.kz/android/exclusiv/com.ea.game.fifa15_row.zip'
    // const sixtyMb = `http://tegos.kz/android/exclusiv/2_hotel_transylvania_2_the_game.zip`
    // const downloadFileOptions: DownloadOptionType = {
    //   url: sixtyMb,
    // }
    // ipcRenderer.send('download-file', downloadFileOptions)
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
