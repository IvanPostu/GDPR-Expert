import React, {
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { SeverityEvaluationOfPersonalDataView } from './SeverityEvaluationOfPersonalDataView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'
import {
  getSeverityEvaluationOfPersonalDataQuestions,
  GetSeverityEvaluationOfPersonalDataQuestionsResponseType,
} from '@/app/webApi/severityEvaluationOfPersonalData/getSeverityEvaluationOfPersonalDataQuestions'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ clearAuthDataActionCreator }, dispatch)
}

type SeverityEvaluationOfPersonalDataComponentPropType = RouteComponentProps &
  ReturnType<typeof mapDispatchToProps>

type QuestionsType = {
  [key: string]: {
    id: number
    title: string
    description: string
    variants: Array<string>
    selectedVariantIndex: number
    Cost: Array<number>
  }
}
type SeverityEvaluationOfPersonalDataComponentStateType = {
  isLoad: boolean
  questions: QuestionsType
  title: string
  // severityEvaluationOfPersonalData: GetSeverityEvaluationOfPersonalDataQuestionsResponseType | null
}

const SeverityEvaluationOfPersonalDataComponent = (
  props: SeverityEvaluationOfPersonalDataComponentPropType,
): ReactElement => {
  const _isMounted = useRef(false)
  const [state, setState] = useState<SeverityEvaluationOfPersonalDataComponentStateType>({
    isLoad: true,
    questions: {},
    title: '',
  })

  useEffect(() => {
    _isMounted.current = true
    fetchQuestions()

    return () => {
      _isMounted.current = false
    }
  }, [])

  async function fetchQuestions(): Promise<void> {
    const res = await getSeverityEvaluationOfPersonalDataQuestions()

    if (!_isMounted.current) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as GetSeverityEvaluationOfPersonalDataQuestionsResponseType
      const questions: QuestionsType = {}
      Object.entries(data.evaluation).forEach(([key, val]) => {
        questions[key] = { ...val, selectedVariantIndex: -1 }
      })

      setState({ ...state, isLoad: false, questions, title: data.title })
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        props.clearAuthDataActionCreator()
      } else {
        setState({ ...state, isLoad: false })
      }
    }
  }

  const selectAnswer = useCallback(
    (index: number, questionKey: string) => {
      const newQuestions: QuestionsType = { ...state.questions }
      newQuestions[questionKey].selectedVariantIndex = index

      setState({ ...state, questions: newQuestions })
    },
    [state.questions],
  )

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      let isValid = true
      Object.entries(state.questions).forEach(([, val]) => {
        if (val.selectedVariantIndex === -1) isValid = false
      })

      if (!isValid) {
        alert('Este necesar de selectat variantă de răspuns la toate întrebîrile!!!')
        return
      } else {
        const CPD = state.questions['CPD'].Cost[state.questions['CPD'].selectedVariantIndex]
        const UI = state.questions['UI'].Cost[state.questions['UI'].selectedVariantIndex]
        const CC = state.questions['CC'].Cost[state.questions['CC'].selectedVariantIndex]

        console.log(CPD, UI, CC)
      }
    },
    [state.questions],
  )

  return (
    <SeverityEvaluationOfPersonalDataView
      onSubmit={onSubmit}
      title={state.title}
      isLoad={state.isLoad}
      questions={state.questions}
      selectAnswer={selectAnswer}
    />
  )
}

export const SeverityEvaluationOfPersonalData = connect(
  null,
  mapDispatchToProps,
)(SeverityEvaluationOfPersonalDataComponent)
