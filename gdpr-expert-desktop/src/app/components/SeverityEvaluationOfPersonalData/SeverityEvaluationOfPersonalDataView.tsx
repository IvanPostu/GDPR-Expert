import React, { ReactElement, SyntheticEvent } from 'react'
import { FullWidthLoader } from '../BasicLoader'
import { Container } from '../Container'
import { QuestionB } from '../Form/QuestionB'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'

interface SeverityEvaluationOfPersonalDataViewPropType {
  isLoad: boolean
  title: string
  questions: {
    [key: string]: {
      id: number
      title: string
      description: string
      variants: Array<string>
      Cost: Array<number>
      selectedVariantIndex: number
    }
  }
  selectAnswer: (index: number, questionKey: string) => void
  onSubmit: (e: SyntheticEvent) => void
}

export const SeverityEvaluationOfPersonalDataView = (
  props: SeverityEvaluationOfPersonalDataViewPropType,
): ReactElement => {
  const content = props.isLoad ? (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <FullWidthLoader />
    </div>
  ) : (
    <form onSubmit={props.onSubmit} style={{ width: '100%' }}>
      {Object.keys(props.questions).map((key) => {
        return (
          <QuestionB
            key={key}
            header={props.questions[key].title}
            answers={props.questions[key].variants}
            question={props.questions[key].description}
            selectedAnswerIndex={props.questions[key].selectedVariantIndex}
            selectAnswer={(index) => props.selectAnswer(index, key)}
          />
        )
      })}
      <GenericButton type="submit" className={styles.btn}>
        Salvează
      </GenericButton>
    </form>
  )

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.row}>
          <h5 className={styles.title}>{props.title}</h5>
        </div>
        <div className={styles.row}>{content}</div>
      </div>
    </Container>
  )
}
