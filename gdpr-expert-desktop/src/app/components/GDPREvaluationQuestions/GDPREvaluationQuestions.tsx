import { getQuestions, GetQuestionsResponseType } from '@/app/webApi/gDPREvaluation/getQuestions'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { FullWidthLoader } from '../BasicLoader'
import { GDPREvaluationQuestionsView } from './GDPREvaluationQuestionsView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type GDPREvaluationQuestionsComponentPropType = ReturnType<typeof mapDispatchToProps>

type GDPREvaluationQuestionsComponentStateType = {
  isLoading: boolean
  questions: Array<{
    id: number
    text: string
    answers: Array<string>
    selectedAnswer: number
  }>
}

class GDPREvaluationQuestionsComponent extends Component<
  GDPREvaluationQuestionsComponentPropType,
  GDPREvaluationQuestionsComponentStateType
> {
  private _isMounted = false

  constructor(props: GDPREvaluationQuestionsComponentPropType) {
    super(props)

    this.state = {
      isLoading: true,
      questions: [],
    }

    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.selectAnswerHandler = this.selectAnswerHandler.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
    this.fetchQuestions()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  async fetchQuestions(): Promise<void> {
    const res = await getQuestions()
    if (!this._isMounted) return
    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const { questions } = res as GetQuestionsResponseType
      this.setState((prevState) => {
        const newQuestions: Array<{
          id: number
          text: string
          answers: Array<string>
          selectedAnswer: number
        }> = questions.map((a, i) => ({
          answers: ['Da', 'Nu', 'Selectați răspuns...'],
          selectedAnswer: 2,
          id: a.id,
          text: `${i + 1}) ${a.text}`,
        }))

        return { ...prevState, isLoading: false, questions: newQuestions }
      })
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        this.props.clearAuthDataActionCreator()
      }
    }
  }

  submitHandler(e: SyntheticEvent): void {
    e.preventDefault()
    for (const a of this.state.questions) {
      if (a.selectedAnswer === 2) {
        alert(2)
        return
      }
    }

    alert(1)
  }

  selectAnswerHandler(arrIndex: number, responseIndex: number): void {
    const newArr = [...this.state.questions]
    if (responseIndex === 2) return

    newArr[arrIndex].answers = newArr[arrIndex].answers.filter((a, i) => i < 2)
    newArr[arrIndex].selectedAnswer = responseIndex
    this.setState({ questions: newArr })
  }

  render(): ReactElement {
    if (this.state.isLoading) return <FullWidthLoader />

    return (
      <GDPREvaluationQuestionsView
        onSelectAnswer={this.selectAnswerHandler}
        onSubmit={this.submitHandler}
        questions={this.state.questions}
      />
    )
  }
}

export const GDPREvaluationQuestions = connect(
  null,
  mapDispatchToProps,
)(GDPREvaluationQuestionsComponent)
