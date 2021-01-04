import { GlobalStateType } from '@/app/store'
import React, { ReactElement, Fragment, useCallback, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { IoMdMenu } from 'react-icons/io'
import { SideBar } from '../SideBar'

const mapStateToProps = (state: GlobalStateType) => {
  return {
    isAuthenticated: state.authenticationReducer.isAuthenticated,
  }
}

type HeaderComponentPropType = ReturnType<typeof mapStateToProps>

function HeaderComponent(props: HeaderComponentPropType): ReactElement {
  const isAuthenticated = useSelector(
    (state: GlobalStateType) => state.authenticationReducer.isAuthenticated,
  )

  const email = useSelector((state: GlobalStateType) => state.authenticationReducer.userEmail)

  const dispatcher = useDispatch()
  const onLogout = useCallback(() => {
    dispatcher(clearAuthDataActionCreator())
  }, [])

  const [sidebarIsShowed, setSidebarIsShowed] = useState(false)

  const content = isAuthenticated ? (
    <Fragment>
      <li className={styles.listItem}>
        <a className={styles.link}>{email}</a>
      </li>
      <li className={styles.listItem}>
        <a onClick={onLogout} className={styles.link}>
          Logout
        </a>
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
    <Fragment>
      <SideBar hide={() => setSidebarIsShowed(false)} isShowed={sidebarIsShowed} />
      <nav className={styles.topMenu}>
        <div style={{ width: '320px' }}>
          <span
            /**
             * Show if only is authenticated
             */
            onClick={() => setSidebarIsShowed(props.isAuthenticated)}
            className={styles.menuIcon}
            style={{ marginLeft: '20px', borderRadius: '20px' }}
          >
            <IoMdMenu fill="#fff" size="45px" />
          </span>
        </div>
        <div>
          <p className={styles.logo}>GDPR Expert</p>
        </div>
        <div style={{ width: '320px' }}>
          <ul className={styles.listBody}>{content}</ul>
        </div>
      </nav>
    </Fragment>
  )
}

export const Header = connect(mapStateToProps)(HeaderComponent)
