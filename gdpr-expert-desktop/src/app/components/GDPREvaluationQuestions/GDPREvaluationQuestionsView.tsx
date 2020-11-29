import React, { ReactElement, SyntheticEvent } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { QuestionA } from '../Form/QuestionA'
import styles from './styles.module.scss'

type GDPREvaluationQuestionsViewPropType = {
  questions: Array<{
    id: number
    text: string
    answers: Array<string>
    selectedAnswer: number
  }>
  onSelectAnswer: (arrIndex: number, responseIndex: number) => void
  onSubmit: (e: SyntheticEvent) => void
}

export const GDPREvaluationQuestionsView = ({
  onSelectAnswer,
  questions,
  onSubmit,
}: GDPREvaluationQuestionsViewPropType): ReactElement => {
  const content = questions.map((q, i) => {
    return (
      <QuestionA
        key={q.id}
        containerClassName={styles.questionCard}
        question={q.text}
        selectedAnswerIndex={q.selectedAnswer}
        answers={q.answers}
        selectAnswer={onSelectAnswer.bind(null, i)}
      />
    )
  })

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Chestionar: </h2>
          <p style={{ margin: '10px' }}>
            <b>Pentru evaluarea obiectivă este nevoie de răspuns la setul propus de întrebări.</b>
          </p>
        </div>

        {content}

        <ButtonA type="submit" title="Salvează" />
      </form>
    </div>
  )
}
