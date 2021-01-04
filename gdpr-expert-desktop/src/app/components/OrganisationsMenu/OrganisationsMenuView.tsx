import React, { ReactElement, Fragment } from 'react'
import { IoIosRefreshCircle } from 'react-icons/io'

import { Container } from '@/app/components/Container'
import styles from './styles.module.scss'
import { OrganisationsMenuCard } from './OrganisationsMenuCard/OrganisationsMenuCard'
import { InfoButton } from '@/app/components/Button/InfoButton'
import { NavLink } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'
import { OrganisationResponseTypeA } from '@/app/webApi/organisation/getOrganisations'
import { defaultOrganisationImage } from '@/constants/defaultOrganisationImage'
import { BasicLoader, FullScreenLoader } from '@/app/components/BasicLoader'

type OrganisationsMenuViewPropType = {
  organisations: Array<OrganisationResponseTypeA>
  onRefreshClick: () => void
  isLoad: boolean
}

export const OrganisationsMenuView = (props: OrganisationsMenuViewPropType): ReactElement => {
  const organisations = props.organisations
  const listIsEmpty = organisations.length === 0

  const content = listIsEmpty ? (
    <Fragment>
      {props.isLoad && <FullScreenLoader />}

      {!props.isLoad && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Lista de organizații este goală.</h3>
        </div>
      )}
    </Fragment>
  ) : (
    <div className={styles.cards}>
      {organisations.map((item) => (
        <OrganisationsMenuCard
          organisationId={Number(item.organisationId)}
          key={item.organisationId}
          image={item.organisationLogo || defaultOrganisationImage}
          text={item.organisationDescription}
          organisationCreatedOnPlatformDateTime={
            item.organisationCreatedOnPlatformDateTime.split('T')[0]
          }
          organisationFoundedDate={item.organisationFoundedDate}
          title={item.organisationName}
        />
      ))}
    </div>
  )

  return (
    <Fragment>
      <div className={styles.createNewOrganisationContainer}>
        <Container className={styles.container}>
          <div className={styles.item}>
            <label className={styles.title}>Organizații</label>

            {!props.isLoad && (
              <span
                onClick={props.onRefreshClick}
                style={{ marginLeft: '20px', borderRadius: '20px' }}
              >
                <IoIosRefreshCircle fill="#0082e6" size="50px" />
              </span>
            )}
            {props.isLoad && (
              <div style={{ paddingLeft: 20 }}>
                <BasicLoader />
              </div>
            )}
          </div>
          <div className={styles.item}>
            <NavLink to={routeNames.CreateOrganisationPageRoute}>
              <InfoButton title="Creare organizație nouă" />
            </NavLink>
          </div>
        </Container>
      </div>
      <Container>{content}</Container>
    </Fragment>
  )
}
