import React, { ReactElement } from 'react'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'

export const LoginPageView = (): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <h1>Autentificare</h1>

        <div className={styles.txtInputContainer}>
          <label>Email :</label>
          <input type="email" />
        </div>

        <div className={styles.txtInputContainer}>
          <label>Parola :</label>
          <input type="text" />
        </div>

        <div style={{ width: '100%', marginTop: '30px' }}>
          <NavLink to="/" className={styles.link}>
            Creare cont
          </NavLink>
        </div>

        <a className={styles.btn}>Autentificare</a>
      </div>
    </div>
  )
}
