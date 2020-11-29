import React, { ReactElement } from 'react'
import { GDPREvaluationQuestions } from '../GDPREvaluationQuestions/GDPREvaluationQuestions'
import styles from './styles.module.scss'

export const GDPREvaluationProcessView = (): ReactElement => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.body}> */}
      {/* <h1>GDPREvaluationProcessView</h1> */}
      <GDPREvaluationQuestions />
      {/* </div> */}
    </div>
  )
}
