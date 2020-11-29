import React, { ReactElement } from 'react'
import { GDPREvaluationDiagrams } from './diagrams/GDPREvaluationDiagrams'
import { GDPRLastEvaluationDiagram } from './diagrams/GDPRLastEvaluationDiagram'
import styles from './styles.module.scss'

export const GDPRLastEvaluationInfoView = (): ReactElement => {
  const showDiagrams = false

  if (!showDiagrams)
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

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.header}>
          <p className={styles.title}>Rezultatul utltimii evaluării G.D.P.R.</p>
        </div>
        <GDPRLastEvaluationDiagram />
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <p className={styles.title}>Rezultatul evaluării G.D.P.R.</p>
        </div>
        <GDPREvaluationDiagrams dates={['2010-11-22', '2020-11-22']} percents={[22, 87]} />
      </div>
    </div>
  )
}
