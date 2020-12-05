import React, { ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GDPREvaluationQuestions } from '../GDPREvaluationQuestions/GDPREvaluationQuestions'
import styles from './styles.module.scss'

type GDPREvaluationProcessViewPropType = RouteComponentProps

export const GDPREvaluationProcessView = (
  props: GDPREvaluationProcessViewPropType,
): ReactElement => {
  return (
    <div className={styles.container}>
      <GDPREvaluationQuestions {...props} />
    </div>
  )
}
