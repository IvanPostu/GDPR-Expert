import { webServerURL } from '@/app/constants/webServerUrl'
import { dPIAEvaluationPageRedirect } from '@/app/pages/DPIAEvaluationPage/dPIAEvaluationPageRedirect'
import React, { ReactElement, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import DataProtectionImpactAssessmentView from './DataProtectionImpactAssessmentView'
import { startDownloadActionCreator } from '@/app/store/Downloads/actionCreators'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ startDownloadActionCreator }, dispatch)
}

type DataProtectionImpactAssessmentPropType = RouteComponentProps & {
  dataProcessingActivityId: number
} & ReturnType<typeof mapDispatchToProps>

const DataProtectionImpactAssessmentComponent = (
  props: DataProtectionImpactAssessmentPropType,
): ReactElement => {
  const onEvaluateClick = useCallback(() => {
    dPIAEvaluationPageRedirect({
      dataProcessingActivityId: props.dataProcessingActivityId,
      history: props.history,
    })
  }, [])

  const onEvaluateResultClick = useCallback(() => {
    const url = `${webServerURL}/api/dataProtectionImpactAssessment/download?dataProtectionImpactAssessmentId=${props.dataProcessingActivityId}`

    props.startDownloadActionCreator(url)
  }, [])

  return (
    <DataProtectionImpactAssessmentView
      onEvaluateResultClick={onEvaluateResultClick}
      onEvaluateClick={onEvaluateClick}
    />
  )
}

export const DataProtectionImpactAssessment = connect(
  null,
  mapDispatchToProps,
)(DataProtectionImpactAssessmentComponent)
