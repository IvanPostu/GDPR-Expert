import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import DPIAEvaluationView from './DPIAEvaluationView'

type DPIAEvaluationPropType = RouteComponentProps & {
  dataProcessingActivityId: number
}

export class DPIAEvaluation extends Component<DPIAEvaluationPropType> {
  render(): ReactElement {
    return <DPIAEvaluationView />
  }
}
