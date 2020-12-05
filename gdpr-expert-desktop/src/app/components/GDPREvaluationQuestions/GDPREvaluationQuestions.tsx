import { getQuestions, GetQuestionsResponseType } from '@/app/webApi/gDPREvaluation/getQuestions'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { FullWidthLoader } from '../BasicLoader'
import { GDPREvaluationQuestionsView } from './GDPREvaluationQuestionsView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'
import { MessageBoxWrapper, MessageBoxWrapperPropType } from '../MessageBoxWrapper'
import { saveGDPREvaluationResult } from '@/app/webApi/gDPREvaluation/saveGDPREvaluationResult'
import { GlobalStateType } from '@/app/store'
import { RouteComponentProps } from 'react-router-dom'
import { gDPRLastEvaluationInfoPageRedirect } from '@/app/pages/GDPREvaluationPage/GDPRLastEvaluationInfoPage/gDPRLastEvaluationInfoPageRedirect'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisationId: state.organisationInfoReducer.organisation.organisationId,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type GDPREvaluationQuestionsComponentPropType = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps

type GDPREvaluationQuestionsComponentStateType = {
  isLoading: boolean
  messageBoxProp: MessageBoxWrapperPropType
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
      messageBoxProp: {
        message: '',
        onOkClick: alert,
        type: 'success',
      },
    }

    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.selectAnswerHandler = this.selectAnswerHandler.bind(this)
    this.onFailureHandler = this.onFailureHandler.bind(this)
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
          selectedAnswer: 0,
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
      this.onFailureHandler(true)
    }
  }

  onFailureHandler(goBack?: boolean, message?: string): void {
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoading: false,
        messageBoxProp: {
          message: message || 'A apărut o problemă de la procesarea cererii.',
          type: 'error',
          onOkClick: () => {
            this.setState({
              messageBoxProp: {
                ...this.state.messageBoxProp,
                message: '',
              },
            })

            if (goBack) this.props.history.goBack()
          },
        },
      }
    })
  }

  async submitHandler(e: SyntheticEvent): Promise<void> {
    e.preventDefault()
    for (const a of this.state.questions) {
      if (a.selectedAnswer === 2) {
        this.onFailureHandler(false, 'Este necesar de selectat răspuns la toate întrebările!!!')
        return
      }
    }

    const percentage =
      this.state.questions.reduce((acc, cur) => (cur.selectedAnswer === 0 ? acc + 1 : acc), 0) /
      this.state.questions.length

    this.setState({ isLoading: true })
    const res = await saveGDPREvaluationResult({
      organisationId: Number(this.props.organisationId),
      percentages: percentage,
    })

    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          messageBoxProp: {
            message: 'Procesul de evaluare G.D.P.R. a avut loc cu success.',
            type: 'success',
            onOkClick: gDPRLastEvaluationInfoPageRedirect.bind(null, {
              history: this.props.history,
            }),
          },
        }
      })
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        this.props.clearAuthDataActionCreator()
      } else {
        this.onFailureHandler(false)
      }
    }
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
      <MessageBoxWrapper {...this.state.messageBoxProp}>
        <GDPREvaluationQuestionsView
          onSelectAnswer={this.selectAnswerHandler}
          onSubmit={this.submitHandler}
          questions={this.state.questions}
        />
      </MessageBoxWrapper>
    )
  }
}

export const GDPREvaluationQuestions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GDPREvaluationQuestionsComponent)
