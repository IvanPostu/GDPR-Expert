import gdprImage from '@/app/assets/images/GDPR.png'
import React, { FunctionComponent, ReactElement } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { BAR_SIZE, SIDE_BAR_ROUTES } from './constants'
import styles from './styles.module.scss'

type SideBarViewPropType = {
  isShowed: boolean
  hide: () => void
}

export const SideBarView: FunctionComponent<SideBarViewPropType> = (
  props: SideBarViewPropType,
): ReactElement => {
  const leftMargin = props.isShowed ? '0px' : '-800px'
  return (
    <div className={styles.container} style={{ width: BAR_SIZE, left: leftMargin }}>
      <span onClick={props.hide} className={styles.backButton}>
        <IoIosArrowBack size="45px" />
      </span>
      <ul onClick={props.hide} className={styles.sidebar}>
        {SIDE_BAR_ROUTES.map((item, index) => (
          <li key={index}>
            <NavLink to={item.routeName}>
              <span style={{ marginRight: '8px' }}>{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <img className={styles.logo} src={gdprImage} width={`${BAR_SIZE - 50}px`} />
    </div>
  )
}
