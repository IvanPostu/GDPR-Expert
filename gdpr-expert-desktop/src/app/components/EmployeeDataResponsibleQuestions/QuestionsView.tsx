import { GetDataResponsibleQuestionsResponse } from '@/app/webApi/employee/getDataResponsibleQuestions'
import { nanoid } from 'nanoid'
import React, { ReactElement } from 'react'
import { FullWidthLoader } from '../BasicLoader'
import { FormCardA } from '../Form/FormCardA'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'

type QuestionsViewPropType = {
  description?: string
  isLoading: boolean
  questions: Array<GetDataResponsibleQuestionsResponse>
  currentQuestionId: number
  onAnswerClick: (id: number) => void
  setPersonalDataResponsible: (responisble: boolean) => void
}

export const QuestionsView = (props: QuestionsViewPropType): ReactElement => {
  if (props.isLoading) return <FullWidthLoader />

  const question = props.questions.find((a) => a.id === props.currentQuestionId)

  if (!question) return <p>Invalid question ID!!!</p>
  else {
    const isFinal = question.keyword.substr(0, 6) === 'answer'
    let isResponsible = false

    if (isFinal) {
      isResponsible = question.keyword.split(' ')[1] === 'is_responsible'
    }

    return (
      <FormCardA>
        <div className={styles.container}>
          <div className={styles.question}>
            <p>{question.content}</p>
          </div>

          <div className={styles.answers}>
            {question.variants.map((answer, index) => (
              <GenericButton
                className={styles.answerButton}
                key={nanoid()}
                onClick={props.onAnswerClick.bind(null, question.variantsId[index])}
                style={{ background: '#2277EE', marginLeft: '5px' }}
                type="button"
              >
                {answer}
              </GenericButton>
            ))}
          </div>

          {isFinal && (
            <div className={styles.answers}>
              <GenericButton
                onClick={() => props.setPersonalDataResponsible(isResponsible)}
                className={styles.answerButton}
                style={{ background: '#2277EE', marginLeft: '5px' }}
                type="button"
              >
                OK
              </GenericButton>
            </div>
          )}
        </div>
      </FormCardA>
    )
  }
}
