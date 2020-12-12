import { GetSeverityEvaluationOfPersonalDataResultResponseType } from '@/app/webApi/severityEvaluationOfPersonalData/getSeverityEvaluationOfPersonalDataResult'
import React, { ReactElement } from 'react'
import { FullWidthLoader } from '../BasicLoader'
import { Container } from '../Container'
import styles from './styles.module.scss'

type SeverityEvaluationOfPersonalDataResultViewpropType = {
  isLoad: boolean
  severityEvaluationResult: GetSeverityEvaluationOfPersonalDataResultResponseType | null
}

export function SeverityEvaluationOfPersonalDataResultView(
  props: SeverityEvaluationOfPersonalDataResultViewpropType,
): ReactElement {
  if (props.isLoad) return <FullWidthLoader />

  const content = props.severityEvaluationResult ? (
    <div>
      <div className={styles.line}>
        <b>Impactul asupra persoanelor vizate afectate:</b>
      </div>
      <div className={styles.line}>
        {props.severityEvaluationResult?.evaluationResult.impactOnAffectedDataSubjects}
      </div>
      <div className={styles.line}>
        <b>Consecințe posibile pentru persoanele vizate:</b>
      </div>
      <div className={styles.line}>
        {props.severityEvaluationResult?.evaluationResult.possibleConsequencesForDataSubjects}
      </div>
      <div className={styles.line}>
        <b>Obligația de notificare:</b>
      </div>
      <div className={styles.line}>
        {props.severityEvaluationResult?.evaluationResult.notificationObligation}
      </div>
      <div className={styles.line}>
        <b>Data evaluării:</b>
      </div>
      <div className={styles.line}>{props.severityEvaluationResult?.evaluationDate}</div>
    </div>
  ) : null

  return (
    <Container>
      <div className={styles.container}>
        <h1>
          Rezultatul evaluării severității compromiterii datelor cu caracter personal pentru
          activitatea de procesare a datelor
        </h1>
        <div>{content}</div>
      </div>
    </Container>
  )
}
