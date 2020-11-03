import React, { ReactElement, SyntheticEvent, useCallback, useRef, FC, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { LoginFormDataType } from './types'
import styles from './styles.module.scss'
import { routeNames } from '@/app/routes/routeNames'
import { BasicLoader } from '@/app/components/BasicLoader'

type LoginPageViewPropType = {
  submit: (data: LoginFormDataType) => void
  isLoad: boolean
}

export const LoginPageView: FC<LoginPageViewPropType> = (props): ReactElement => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault()

    const formData: LoginFormDataType = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
    }

    props.submit(formData)
  }, [])

  const content = props.isLoad ? (
    <div style={{ left: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BasicLoader size="100px" />
    </div>
  ) : (
    <Fragment>
      <div className={styles.txtInputContainer}>
        <label>Email :</label>
        <input ref={emailRef} type="email" name="email" />
      </div>

      <div className={styles.txtInputContainer}>
        <label>Parola :</label>
        <input ref={passwordRef} type="password" name="password" />
      </div>

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
