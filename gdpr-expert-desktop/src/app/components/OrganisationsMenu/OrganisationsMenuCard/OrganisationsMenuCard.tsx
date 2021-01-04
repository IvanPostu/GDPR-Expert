import { routeNames } from '@/app/routes/routeNames'
import React, { ReactElement, FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchOrganisationActionCreator } from '@/app/store/OrganisationInfo/actionCreators'
import styles from './cards.module.scss'

type OrganisationsMenuCardPropType = {
  organisationId: number
  title: string
  text: string
  organisationFoundedDate: string
  organisationCreatedOnPlatformDateTime: string
  image: string
  titleBackgroundColor?: string
  titleTextColor?: string
}

export const OrganisationsMenuCard: FC<OrganisationsMenuCardPropType> = (props): ReactElement => {
  const titleBackgroundColor = props.titleBackgroundColor || 'rgba(75, 145, 220, 0.95)'
  const titleTextColor = props.titleTextColor || 'black'
  const description = props.text.length > 100 ? props.text.substr(0, 100) + ' ...' : props.text
  const organisationId = props.organisationId

  const dispatch = useDispatch()
  const onClickHandler = useCallback(() => {
    dispatch(fetchOrganisationActionCreator(organisationId))
  }, [])

  return (
    <NavLink onClick={onClickHandler} to={routeNames.OrganisationPageRoute} className={styles.card}>
      <span className={styles.cardHeader}>
        <img src={props.image} width="100%" height="100%" style={{ opacity: 0.85 }} />
        <span className={styles.cardTitle} style={{ background: titleBackgroundColor }}>
          <h3 style={{ color: titleTextColor }}>{props.title}</h3>
        </span>
      </span>
      <span className={styles.cardSummary}>
        {description}
        <div className={styles.dates}>
          <div className={styles.date}>
            <span>Data fondării:</span>
            <span>{props.organisationFoundedDate}</span>
          </div>
          <div className={styles.date}>
            <span>Data înregistrării pe platformă:</span>
            <span>{props.organisationCreatedOnPlatformDateTime}</span>
          </div>
        </div>
      </span>
    </NavLink>
  )
}
