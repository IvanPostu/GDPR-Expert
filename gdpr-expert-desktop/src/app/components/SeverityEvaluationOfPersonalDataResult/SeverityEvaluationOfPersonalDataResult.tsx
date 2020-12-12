import {
  getSeverityEvaluationOfPersonalDataResponse,
  GetSeverityEvaluationOfPersonalDataResultResponseType,
} from '@/app/webApi/severityEvaluationOfPersonalData/getSeverityEvaluationOfPersonalDataResult'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { SeverityEvaluationOfPersonalDataResultView } from './SeverityEvaluationOfPersonalDataResultView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ clearAuthDataActionCreator }, dispatch)
}

type SeverityEvaluationOfPersonalDataResultComponentPropType = RouteComponentProps & {
  severityEvaluationResultId: number
} & ReturnType<typeof mapDispatchToProps>

type SeverityEvaluationOfPersonalDataResultComponentStateType = {
  isLoad: boolean
  severityEvaluationResult: GetSeverityEvaluationOfPersonalDataResultResponseType | null
}

function SeverityEvaluationOfPersonalDataResultComponent(
  props: SeverityEvaluationOfPersonalDataResultComponentPropType,
): ReactElement {
  const _isMounted = useRef(false)
  useEffect(() => {
    _isMounted.current = true

    fetchResult()

    return () => {
      _isMounted.current = false
    }
  }, [])
  const [state, setState] = useState<SeverityEvaluationOfPersonalDataResultComponentStateType>({
    isLoad: true,
    severityEvaluationResult: null,
  })

  async function fetchResult(): Promise<void> {
    const res = await getSeverityEvaluationOfPersonalDataResponse(props.severityEvaluationResultId)
    if (!_isMounted.current) return
    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as GetSeverityEvaluationOfPersonalDataResultResponseType
      setState({ ...state, isLoad: false, severityEvaluationResult: data })
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        props.clearAuthDataActionCreator()
      } else {
        if (err.status === 204) {
          alert(
            'Pentru organizația dată nu s-a realizat evaluarea severității compromiterii datelor cu caracter personal.',
          )
          props.history.goBack()
        }
      }
    }
  }

  return (
    <SeverityEvaluationOfPersonalDataResultView
      isLoad={state.isLoad}
      severityEvaluationResult={state.severityEvaluationResult}
    />
  )
}

export const SeverityEvaluationOfPersonalDataResult = connect(
  null,
  mapDispatchToProps,
)(SeverityEvaluationOfPersonalDataResultComponent)
