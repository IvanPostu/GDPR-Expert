import React, { Component, ReactElement } from 'react'
import { Container } from '@/app/components/Container'
import styles from './styles.module.scss'

class OrganisationPageComponent extends Component {
  render(): ReactElement {
    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.row}>
            <div>
              <h1>Organisation: </h1>
            </div>
            <div>
              <h4>test test afdkad </h4>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export const OrganisationPage = OrganisationPageComponent
