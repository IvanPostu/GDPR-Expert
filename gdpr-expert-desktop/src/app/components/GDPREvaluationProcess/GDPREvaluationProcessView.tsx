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
      {/* <div className={styles.body}> */}
      {/* <h1>GDPREvaluationProcessView</h1> */}
      <GDPREvaluationQuestions {...props} />
      {/* </div> */}
    </div>
  )
}
