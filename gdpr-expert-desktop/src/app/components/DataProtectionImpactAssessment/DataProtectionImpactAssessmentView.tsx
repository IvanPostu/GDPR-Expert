import React, { ReactElement } from 'react'
import { Container } from '../Container'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'
import DPIAGeneralItem from './DPIAGeneralItem'
import { DPIACriteriaIfAnalyzeIsNeeded } from './DPIACriteriaIfAnalyzeIsNeeded'

export default function DataProtectionImpactAssessmentView(): ReactElement {
  const onEvaluateClick = undefined

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Container>
          <h1>Evaluare a impactului privind protecția datelor E.I.P.D. conform R.G.P.D.</h1>
          <div className={styles.buttons}>
            <GenericButton onClick={onEvaluateClick} className={styles.btn}>
              Realizare evaluare a impactului privind protecția datelor
            </GenericButton>
          </div>
        </Container>
      </div>
      <Container>
        <DPIAGeneralItem />
        <DPIACriteriaIfAnalyzeIsNeeded />
      </Container>
    </div>
  )
}
