import React, { ReactElement, Fragment } from 'react'

import { Container } from '@/app/components/Container'
import styles from './styles.module.scss'
// import image314 from '@/app/assets/images/imageadfdaf.jpg'
// import { OrganisationCard } from './OrganisationCard'
import { InfoButton } from '@/app/components/Button/InfoButton'
import { NavLink } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'

export const OrganisationsPageView = (): ReactElement => {
  return (
    <Fragment>
      <Container>
        <div className={styles.createNewOrganisationContainer}>
          <label className={styles.title}>Organizații</label>
          <div>
            <NavLink to={routeNames.CreateOrganisationPageRoute}>
              <InfoButton title="Creare organizație nouă" />
            </NavLink>
          </div>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Lista de organizații este goală. Creați organizație.</h3>
        </div>
        {/* <div className={styles.cards}>
          <OrganisationCard
            image={image314}
            text="Gestionați automat toate activitățile ce necesită un set bine stabilit de acțiuni, conform
        regulamentului."
            title="Creare organizație nouă."
          />
          <OrganisationCard
            image={image314}
            text="Gestionați automat toate activitățile ce necesită un set bine stabilit de acțiuni, conform
        regulamentului."
            title="Creare organizație nouă."
          />
          <OrganisationCard
            image={image314}
            text="Gestionați automat toate activitățile ce necesită un set bine stabilit de acțiuni, conform
        regulamentului."
            title="Creare organizație nouă."
          />
          <OrganisationCard
            image={image314}
            text="Gestionați automat toate activitățile ce necesită un set bine stabilit de acțiuni, conform
        regulamentului."
            title="Creare organizație nouă."
          />
        </div> */}
      </Container>
    </Fragment>
  )
}
