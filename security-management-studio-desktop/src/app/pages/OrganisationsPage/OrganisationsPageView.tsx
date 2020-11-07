import React, { ReactElement, Fragment } from 'react'
import { IoIosRefreshCircle } from 'react-icons/io'

import { Container } from '@/app/components/Container'
import styles from './styles.module.scss'
import { OrganisationCard } from './OrganisationCard'
import { InfoButton } from '@/app/components/Button/InfoButton'
import { NavLink } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'
import { OrganisationResponseTypeA } from '@/app/webApi/organisation/getOrganisations'
import { defaultOrganisationImage } from './defaultOrganisationImage'

type OrganisationsPageViewPropType = {
  organisations: Array<OrganisationResponseTypeA>
  onRefreshClick: () => void
}

export const OrganisationsPageView = (props: OrganisationsPageViewPropType): ReactElement => {
  const organisations = props.organisations
  const listIsEmpty = organisations.length === 0

  const content = listIsEmpty ? (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h3>Lista de organizații este goală.</h3>
    </div>
  ) : (
    <div className={styles.cards}>
      {organisations.map((item) => (
        <OrganisationCard
          key={item.organisationId}
          image={item.organisationLogo || defaultOrganisationImage}
          text={item.organisationDescription}
          title={item.organisationName}
        />
      ))}
    </div>
  )

  console.log(organisations)

  return (
    <Fragment>
      <Container>
        <div className={styles.createNewOrganisationContainer}>
          <div className={styles.item}>
            <label className={styles.title}>Organizații</label>
            <span
              onClick={props.onRefreshClick}
              style={{ marginLeft: '20px', borderRadius: '20px' }}
            >
              <IoIosRefreshCircle fill="#0082e6" size="50px" />
            </span>
          </div>
          <div className={styles.item}>
            <NavLink to={routeNames.CreateOrganisationPageRoute}>
              <InfoButton title="Creare organizație nouă" />
            </NavLink>
          </div>
        </div>

        {content}
      </Container>
    </Fragment>
  )
}
