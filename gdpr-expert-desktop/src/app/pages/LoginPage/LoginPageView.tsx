import React, { ReactElement, SyntheticEvent, useCallback, useState, FC, Fragment } from 'react'
import { useSelector } from 'react-redux'

import { LoginFormDataType } from './types'
import { BasicLoader } from '@/app/components/BasicLoader'
import { GlobalStateType } from '@/app/store'
import { FormCardA } from '@/app/components/Form/FormCardA'
import { TextInputA } from '@/app/components/Form/TextInputA'
import { ButtonA } from '@/app/components/Form/ButtonA'
import { NavLink } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'

type LoginPageViewPropType = {
  submit: (data: LoginFormDataType) => void
  clearErrorMessage: () => void
  isLoad: boolean
  errorMessage: string
}

export const LoginPageView: FC<LoginPageViewPropType> = (props): ReactElement => {
  const messageStatus = useSelector(
    (store: GlobalStateType) => store.authenticationReducer.messageStatus,
  )

  const [authData, setAuthData] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: '',
  })

  const messageStatusColor =
    messageStatus === 'err'
      ? 'red'
      : messageStatus === 'info'
      ? 'blue'
      : messageStatus === 'success'
      ? 'green'
      : 'yellow'

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      const formData: LoginFormDataType = {
        ...authData,
      }

      props.submit(formData)
    },
    [authData],
  )

  const clearErrorMessage = useCallback(() => {
    if (props.errorMessage) {
      props.clearErrorMessage()
    }
  }, [props.errorMessage])

  const content = props.isLoad ? (
    <div style={{ left: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BasicLoader size="100px" />
    </div>
  ) : (
    <Fragment>
      <TextInputA
        labelName="Email:"
        onTextChange={(str: string) => setAuthData({ ...authData, email: str })}
      />
      <TextInputA
        labelName="Email:"
        type="password"
        onTextChange={(str: string) => setAuthData({ ...authData, password: str })}
      />

      <div style={{ width: '100%', marginTop: '30px' }}>
        <NavLink to={routeNames.RegistrationPageRoute} style={{ fontSize: 16 }}>
          Creare cont
        </NavLink>
      </div>

      {props.errorMessage && (
        <p style={{ color: messageStatusColor, margin: 10 }}>{props.errorMessage}</p>
      )}

      <ButtonA type="submit" title="Autentificare" />
    </Fragment>
  )

  return (
    <FormCardA
      cardBackgroundColor="rgba(255, 255, 255, 0.97)"
      onSubmit={onSubmit}
      onClick={clearErrorMessage}
    >
      <h1>Autentificare: </h1>
      {content}
    </FormCardA>
  )
}
