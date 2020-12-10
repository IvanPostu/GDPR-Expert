import React, { FunctionComponent, ReactElement } from 'react'
import gdprImage from '@/app/assets/images/GDPR.png'
import styles from './styles.module.scss'
import { BAR_SIZE } from './constants'
import { IoIosArrowBack, IoMdClipboard, IoIosInformationCircleOutline } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'

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
        <li>
          <NavLink to={routeNames.OrganisationsPageRoute}>
            <span style={{ marginRight: '8px' }}>
              <IoMdClipboard />
            </span>
            Organizații
          </NavLink>
        </li>
        <li>
          <NavLink to={routeNames.RequestsForPersonalInfoPageRoute}>
            <span style={{ marginRight: '8px' }}>
              <IoIosInformationCircleOutline />
            </span>
            Cereri de solicitare a datelor
          </NavLink>
        </li>
      </ul>
      <img className={styles.logo} src={gdprImage} width={`${BAR_SIZE - 50}px`} />
    </div>
  )
}
