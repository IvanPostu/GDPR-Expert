import React, { ReactElement } from 'react'
import { Container } from '../Container'
import styles from './processingActivitiesView.module.scss'
import { IoIosAddCircleOutline, IoIosRefresh } from 'react-icons/io'

type ProcessingActivitiesViewPropType = {
  organisationName: string
}

export const ProcessingActivitiesView = (props: ProcessingActivitiesViewPropType): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Container className={styles.items}>
          <div>
            <p className={styles.title}>
              Activități de prelucrare a datelor cu caracter personal pentru organizația{' '}
              {props.organisationName}
            </p>
          </div>

          <div>
            <button className={styles.actionButton}>
              <IoIosAddCircleOutline style={{ fontSize: 42 }} />
            </button>
            <button className={styles.actionButton}>
              <IoIosRefresh style={{ fontSize: 42 }} />
            </button>
          </div>
        </Container>
      </div>
    </div>
  )
}
