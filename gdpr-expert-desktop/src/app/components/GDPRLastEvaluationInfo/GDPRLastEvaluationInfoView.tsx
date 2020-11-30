import React, { ReactElement } from 'react'
import { GDPREvaluationDiagrams } from './diagrams/GDPREvaluationDiagrams'
import { GDPRLastEvaluationDiagram } from './diagrams/GDPRLastEvaluationDiagram'
import styles from './styles.module.scss'

type GDPRLastEvaluationInfoViewPropType = {
  dates: Array<string>
  percentages: Array<number>
  isEpty?: boolean
}

export const GDPRLastEvaluationInfoView = (
  props: GDPRLastEvaluationInfoViewPropType,
): ReactElement => {
  if (props.isEpty)
    return (
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.header}>
            <p className={styles.title} style={{ color: 'red' }}>
              Pentru compania dată nu s-a realizat nici o evaluare G.D.P.R.{' '}
            </p>
          </div>
        </div>
      </div>
    )

  const greenPercents = props.percentages[props.percentages.length - 1]
  const redPercents = 100 - greenPercents

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.header}>
          <p className={styles.title}>Rezultatul utltimii evaluări G.D.P.R.</p>
        </div>
        <GDPRLastEvaluationDiagram greenPercents={greenPercents} redPercents={redPercents} />
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <p className={styles.title}>Diagrama ultimelor evaluării G.D.P.R.</p>
        </div>
        <GDPREvaluationDiagrams dates={props.dates} percents={props.percentages} />
      </div>
    </div>
  )
}
