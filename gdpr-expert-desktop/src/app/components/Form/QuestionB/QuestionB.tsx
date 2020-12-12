import React, { Component, ReactElement, MouseEvent, useCallback } from 'react'
import styles from './styles.module.scss'

type QuestionBPropType = {
  header?: string
  question: string
  answers: Array<string>
  selectedAnswerIndex?: number
  selectAnswer: (index: number) => void
}

export class QuestionB extends Component<QuestionBPropType> {
  render(): ReactElement {
    const { header, answers, question, selectAnswer, selectedAnswerIndex } = this.props

    return (
      <div className={styles.container}>
        {header && (
          <label>
            <b>{header}</b>
          </label>
        )}
        <label>{question}</label>
        <div className={styles.questions}>
          <ul>
            {this.props.answers.map((item, index) => (
              <li
                onClick={() => selectAnswer(index)}
                className={selectedAnswerIndex === index ? styles.selected : ''}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
