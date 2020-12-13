import React, { ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import DataProtectionImpactAssessmentView from './DataProtectionImpactAssessmentView'

type DataProtectionImpactAssessmentPropType = RouteComponentProps & {
  dataProcessingActivityId: number
}

export const DataProtectionImpactAssessment = (
  props: DataProtectionImpactAssessmentPropType,
): ReactElement => {
  return <DataProtectionImpactAssessmentView />
}
