import React, { ChangeEvent, ReactElement, useCallback } from 'react'
import styles from './styles.module.scss'

type QuestionAPropType = {
  question: string
  answers: Array<string>
  selectedAnswerIndex: number
  selectAnswer: (index: number) => void
  containerClassName?: string
  selectClassName?: string
}

export const QuestionA = ({
  answers,
  question,
  selectAnswer,
  selectedAnswerIndex,
  containerClassName,
  selectClassName,
}: QuestionAPropType): ReactElement => {
  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const itemIndex = Number(e.target.value)
      selectAnswer(itemIndex)
    },
    [selectedAnswerIndex],
  )

  const answersContent = answers.map((item, index) => (
    <option key={index} value={index}>
      {item}
    </option>
  ))

  return (
    <div className={`${containerClassName || ''} ${styles.container}`}>
      <label>{question}</label>
      <select className={selectClassName || ''} value={selectedAnswerIndex} onChange={onChange}>
        {answersContent}
      </select>
    </div>
  )
}
