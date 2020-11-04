import { GlobalStateType } from '@/app/store'
import React, { ReactElement, Fragment } from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'

export function Header(): ReactElement {
  const isAuthenticated = useSelector(
    (state: GlobalStateType) => state.authenticationReducer.isAuthenticated,
  )

  const email = useSelector((state: GlobalStateType) => state.authenticationReducer.userEmail)

  const content = isAuthenticated ? (
    <Fragment>
      <li className={styles.listItem}>
        <NavLink className={styles.link} to={routeNames.LoginPageRoute}>
          Organizații
        </NavLink>
      </li>
      <li className={styles.listItem}>
        <a className={styles.link}>{email}</a>
      </li>
    </Fragment>
  ) : (
    <li className={styles.listItem}>
      <a></a>
      <NavLink className={styles.link} to={routeNames.LoginPageRoute}>
        Autentifică
      </NavLink>
    </li>
  )

  return (
    <nav className={styles.topMenu}>
      <label className={styles.logo}>Security Management Studio</label>
      <ul className={styles.listBody}>{content}</ul>
    </nav>
  )
}
