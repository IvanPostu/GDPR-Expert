import React, { ReactElement, SyntheticEvent, useCallback, useRef, FC, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { LoginFormDataType } from './types'
import styles from './styles.module.scss'
import { routeNames } from '@/app/routes/routeNames'
import { BasicLoader } from '@/app/components/BasicLoader'
import { GlobalStateType } from '@/app/store'

type LoginPageViewPropType = {
  submit: (data: LoginFormDataType) => void
  clearErrorMessage: () => void
  isLoad: boolean
  errorMessage: string
}

export const LoginPageView: FC<LoginPageViewPropType> = (props): ReactElement => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const messageStatus = useSelector(
    (store: GlobalStateType) => store.authenticationReducer.messageStatus,
  )

  const messageStatusColor =
    messageStatus === 'err'
      ? 'red'
      : messageStatus === 'info'
      ? 'blue'
      : messageStatus === 'success'
      ? 'green'
      : 'yellow'

  const onSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault()

    const formData: LoginFormDataType = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    }

    props.submit(formData)
  }, [])

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
      <div className={styles.txtInputContainer}>
        <label>Email :</label>
        <input onClick={clearErrorMessage} ref={emailRef} type="email" name="email" />
      </div>

      <div className={styles.txtInputContainer}>
        <label>Parola :</label>
        <input onClick={clearErrorMessage} ref={passwordRef} type="password" name="password" />
      </div>

      {props.errorMessage && <p style={{ color: messageStatusColor }}>{props.errorMessage}</p>}

      <div style={{ width: '100%', marginTop: '30px' }}>
        <NavLink to={routeNames.RegistrationPageRoute} className={styles.link}>
          Creare cont
        </NavLink>
      </div>

      <button type="submit" className={styles.btn}>
        Autentificare
      </button>
    </Fragment>
  )

  return (
    <div onSubmit={onSubmit} className={styles.container}>
      <form className={styles.loginForm}>
        <h1>Autentificare</h1>

        {content}
      </form>
    </div>
  )
}
