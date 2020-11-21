import React, { ReactElement } from 'react'
import { Container } from '../Container'
import styles from './processingActivitiesView.module.scss'
import { IoIosAddCircleOutline, IoIosRefresh } from 'react-icons/io'

export const ProcessingActivitiesView = (): ReactElement => {
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Activități de prelucrare a datelor cu caracter personal</h1>
          <button className={styles.actionButton}>
            <IoIosAddCircleOutline style={{ fontSize: 32 }} />
          </button>
          <button className={styles.actionButton}>
            <IoIosRefresh style={{ fontSize: 32 }} />
          </button>
        </div>
      </div>
    </Container>
  )
}
