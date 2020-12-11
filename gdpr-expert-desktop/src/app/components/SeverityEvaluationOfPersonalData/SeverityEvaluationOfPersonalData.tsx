import React, { ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { SeverityEvaluationOfPersonalDataView } from './SeverityEvaluationOfPersonalDataView'

type SeverityEvaluationOfPersonalDataPropType = RouteComponentProps

export const SeverityEvaluationOfPersonalData = (
  props: SeverityEvaluationOfPersonalDataPropType,
): ReactElement => {
  return <SeverityEvaluationOfPersonalDataView />
}
