import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import {
  getDataResponsibleQuestions,
  GetDataResponsibleQuestionsResponse,
} from '@/app/webApi/employee/getDataResponsibleQuestions'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { QuestionsView } from './QuestionsView'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type EmployeeDataResponsibleQuestionsComponentPropType = {
  setPersonalDataResponsible: (responisble: boolean) => void
} & ReturnType<typeof mapDispatchToProps>

type EmployeeDataResponsibleQuestionsComponentStateType = {
  isLoad: boolean
  questions: Array<GetDataResponsibleQuestionsResponse>
  questionId: number
}

class EmployeeDataResponsibleQuestionsComponent extends Component<
  EmployeeDataResponsibleQuestionsComponentPropType,
  EmployeeDataResponsibleQuestionsComponentStateType
> {
  private _isMounted = false

  constructor(props: EmployeeDataResponsibleQuestionsComponentPropType) {
    super(props)

    this.state = {
      isLoad: true,
      questions: [],
      questionId: 0,
    }

    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.onAnswerClick = this.onAnswerClick.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
    this.fetchQuestions()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  onAnswerClick(id: number): void {
    this.setState({ questionId: id })
  }

  async fetchQuestions(): Promise<void> {
    const response = await getDataResponsibleQuestions()

    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(response)) {
      const data = response as Array<GetDataResponsibleQuestionsResponse>
      this.setState({ isLoad: false, questions: data, questionId: data[0].id })
    } else {
      const err = response as UnsuccessResponseData
      if (err.isSessionExpired) {
        this.props.clearAuthDataActionCreator()
      }
    }
  }

  render(): ReactElement {
    return (
      <QuestionsView
        currentQuestionId={this.state.questionId}
        questions={this.state.questions}
        isLoading={this.state.isLoad}
        onAnswerClick={this.onAnswerClick}
        setPersonalDataResponsible={this.props.setPersonalDataResponsible}
      />
    )
  }
}

export const EmployeeDataResponsibleQuestions = connect(
  null,
  mapDispatchToProps,
)(EmployeeDataResponsibleQuestionsComponent)
