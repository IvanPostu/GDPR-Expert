import React, { Component, ReactElement, PropsWithChildren } from 'react'
import { RegistrationPageView } from './RegistrationPageView'
import { RegistrationFormData } from './types'
import { registrateUser } from '@/app/webApi/registration/registration'
import { Redirect } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { setMessageActionCreator } from '@/app/store/Authentication/actionCreators'
import { startDownloadActionCreator } from '@/app/store/Downloads/actionCreators'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { setMessageActionCreator, startDownloadActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type RegistrationPagePropType = PropsWithChildren<unknown> & ReturnType<typeof mapDispatchToProps>
type RegistrationPageStateType = {
  redirectToLogin: boolean
  message: string
  messageColor: string
  isLoad: boolean
}

class RegistrationPageContainer extends Component<
  RegistrationPagePropType,
  RegistrationPageStateType
> {
  private _isMounted: boolean

  constructor(props: RegistrationPagePropType) {
    super(props)
    this._isMounted = false

    this.state = {
      redirectToLogin: false,
      message: '',
      messageColor: '',
      isLoad: false,
    }

    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
    // const min = `http://tegos.kz/android/exclusiv/1_pac_man_championship_edition_dx.apk`
    // const sixtyMb = `http://tegos.kz/android/exclusiv/2_hotel_transylvania_2_the_game.zip`
    // const GB = 'http://tegos.kz/android/exclusiv/com.ea.game.fifa15_row.zip'
    // this.props.startDownloadActionCreator(min, 'abcdef.txt')
  }

  async submitHandler(data: RegistrationFormData): Promise<void> {
    this.setState({ isLoad: true })
    const registrationWithSuccess = await registrateUser({
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
    })

    if (this._isMounted) {
      if (registrationWithSuccess) {
        this.props.setMessageActionCreator({
          message: 'Cont de utilizator creat cu success.',
          messageStatus: 'success',
        })
        this.setState(() => ({ redirectToLogin: true, isLoad: false }))
      } else {
        this.setState({
          message: 'A apărut eroare în procesul de înregistrare, încercați din nou.',
          messageColor: 'red',
          isLoad: false,
        })
      }
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  render(): ReactElement {
    if (this.state.redirectToLogin) {
      return <Redirect to={routeNames.LoginPageRoute} />
    }

    return (
      <RegistrationPageView
        isLoad={this.state.isLoad}
        clearMessage={() => this.setState({ message: '' })}
        message={this.state.message}
        messageColor={this.state.messageColor}
        submit={this.submitHandler}
      />
    )
  }
}

export const RegistrationPage = connect(null, mapDispatchToProps)(RegistrationPageContainer)
