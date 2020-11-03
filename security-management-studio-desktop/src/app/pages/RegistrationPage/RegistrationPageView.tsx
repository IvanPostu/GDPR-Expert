import React, { ReactElement, SyntheticEvent, FC, useCallback, useRef, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import { routeNames } from '@/app/routes/routeNames'
import styles from './styles.module.scss'
import { RegistrationFormData } from './types'
import { BasicLoader } from '@/app/components/BasicLoader'

type RegistrationPageViewPropType = {
  submit: (data: RegistrationFormData) => void
  message: string
  messageColor: string
  isLoad: boolean
  clearMessage: () => void
}

export const RegistrationPageView: FC<RegistrationPageViewPropType> = (props): ReactElement => {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmit = useCallback((e: SyntheticEvent) => {
    e.preventDefault()
    const formData: RegistrationFormData = {
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
      firstname: firstNameRef.current?.value as string,
      lastname: lastNameRef.current?.value as string,
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
        <label>Nume :</label>
        <input ref={firstNameRef} type="text" name="firstname" />
      </div>

      <div className={styles.txtInputContainer}>
        <label>Prenume :</label>
        <input ref={lastNameRef} type="text" name="lastname" />
      </div>

      <div className={styles.txtInputContainer}>
        <label>Email :</label>
        <input ref={emailRef} type="email" name="email" />
      </div>

      <div className={styles.txtInputContainer}>
        <label>Parola :</label>
        <input ref={passwordRef} type="password" name="password" />
      </div>

      <p style={{ color: props.messageColor }}>{props.message}</p>

      <div style={{ width: '100%', marginTop: '30px' }}>
        <NavLink to={routeNames.LoginPageRoute} className={styles.link}>
          Autentificare
        </NavLink>
      </div>

      <button type="submit" className={styles.btn}>
        Înregistrare
      </button>
    </Fragment>
  )

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1>Înregistrare</h1>
        {content}
      </form>
    </div>
  )
}
