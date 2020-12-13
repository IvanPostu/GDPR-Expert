import { dPIAEvaluationPageRedirect } from '@/app/pages/DPIAEvaluationPage/dPIAEvaluationPageRedirect'
import React, { ReactElement, useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import DataProtectionImpactAssessmentView from './DataProtectionImpactAssessmentView'

type DataProtectionImpactAssessmentPropType = RouteComponentProps & {
  dataProcessingActivityId: number
}

export const DataProtectionImpactAssessment = (
  props: DataProtectionImpactAssessmentPropType,
): ReactElement => {
  const onEvaluateClick = useCallback(() => {
    dPIAEvaluationPageRedirect({
      dataProcessingActivityId: props.dataProcessingActivityId,
      history: props.history,
    })
  }, [])

  return <DataProtectionImpactAssessmentView onEvaluateClick={onEvaluateClick} />
}
