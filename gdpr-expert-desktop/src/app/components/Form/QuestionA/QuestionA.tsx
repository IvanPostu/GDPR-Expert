import React, { ChangeEvent, ReactElement, useCallback } from 'react'
import styles from './styles.module.scss'

type QuestionAPropType = {
  question: string
  answers: Array<string>
  selectedAnswerIndex?: number
  initialAnswerIndex?: number
  selectAnswer: (index: number) => void
  containerClassName?: string
  selectClassName?: string
}

export const QuestionA = (props: QuestionAPropType): ReactElement => {
  const {
    answers,
    question,
    selectAnswer,
    selectedAnswerIndex,
    initialAnswerIndex,
    containerClassName,
    selectClassName,
  } = props

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const itemIndex = Number(e.target.value)
      selectAnswer(itemIndex)
    },
    [props],
  )

  const answersContent = answers.map((item, index) => (
    <option key={index} value={index}>
      {item}
    </option>
  ))

  return (
    <div className={`${containerClassName || ''} ${styles.container}`}>
      <label>{question}</label>
      <select
        className={selectClassName || ''}
        defaultValue={initialAnswerIndex}
        value={selectedAnswerIndex}
        onChange={onChange}
      >
        {answersContent}
      </select>
    </div>
  )
}
