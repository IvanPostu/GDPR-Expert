import React, { ReactElement } from 'react'
import { Container } from '../Container'
import styles from './processingActivitiesView.module.scss'
import { IoIosAddCircleOutline, IoIosRefresh } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'
import { ProcessingActivitiesTable } from './ProcessingActivitiesTable'
import { ProcessingActivitiesTableItemsType } from './types'

type ProcessingActivitiesViewPropType = {
  organisationName: string
  dataProcessingActivities: Array<ProcessingActivitiesTableItemsType>
  onRefreshClick: () => void
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
            <Link to={routeNames.CreateProcessingActivityPageRoute}>
              <button className={styles.actionButton}>
                <IoIosAddCircleOutline style={{ fontSize: 50 }} />
              </button>
            </Link>
            <button onClick={props.onRefreshClick} className={styles.actionButton}>
              <IoIosRefresh style={{ fontSize: 50 }} />
            </button>
          </div>
        </Container>
      </div>

      <Container>
        <div className={styles.body}>
          <ProcessingActivitiesTable
            onInfoClick={alert}
            onUpdateClick={alert}
            activities={props.dataProcessingActivities}
          />
        </div>
      </Container>
    </div>
  )
}
