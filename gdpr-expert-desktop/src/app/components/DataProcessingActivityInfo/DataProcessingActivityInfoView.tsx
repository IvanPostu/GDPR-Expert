import { DataProcessingActivityInfoResponseType } from '@/app/webApi/dataProcessingActivity/getDataProcessingActivityInfo'
import React, { ReactElement } from 'react'
import { Container } from '../Container'
import styles from './styles.module.scss'

type DataProcessingActivityInfoViewPropType = {
  activityData: DataProcessingActivityInfoResponseType //{ [key: string]: string }
}

export const DataProcessingActivityInfoView = (
  props: DataProcessingActivityInfoViewPropType,
): ReactElement => {
  const uiData: { [key: string]: string } = {
    'Organizație: ': props.activityData.organisationName,
    'Departament: ': props.activityData.departmentName,
    'Denumirea activității de prelucrare a datelor: ': props.activityData.activityName,
    'Începutul activității de procesare: ': props.activityData.beginningOfTheActivity,
    'Sfîrșitul activității de procesare: ': props.activityData.endOfTheActivity,
    'Date de tip sensibile: ': props.activityData.dataIsSensible ? 'Da' : 'Nu',
    'Persoana cărei aparțina datele: ': props.activityData.dataOwner,
    'Persoana care procesează datele: ':
      props.activityData.dataProcessingResponsibleEmployeeFullname,
    'Descriere activității de procesare: ': props.activityData.description,
    'Scopul procesării datelor: ': props.activityData.purposes,
    'Statut: ': props.activityData.status,
  }

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.row}>
          <h5 className={styles.title}>
            Informație relativ la activitatea de procesare a datelor cu caracter personal
          </h5>
        </div>
        {Object.keys(uiData).map((key) => (
          <div key={key} className={styles.row}>
            <div className={styles.column}>
              <span className={styles.text}>{key}</span>
            </div>
            <div className={styles.column}>
              <span className={styles.text}>{uiData[key]}</span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
