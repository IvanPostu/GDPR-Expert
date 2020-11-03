import React, { ReactElement, SyntheticEvent, FC, useCallback, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import { routeNames } from '@/app/routes/routeNames'
import styles from './styles.module.scss'
import { RegistrationFormData } from './types'

type RegistrationPageViewPropType = {
  submit: (data: RegistrationFormData) => void
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

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1>Înregistrare</h1>

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

        <div style={{ width: '100%', marginTop: '30px' }}>
          <NavLink to={routeNames.LoginPageRoute} className={styles.link}>
            Logare
          </NavLink>
        </div>

        <button type="submit" className={styles.btn}>
          Înregistrare
        </button>
      </form>
    </div>
  )
}
