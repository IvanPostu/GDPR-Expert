import { DPIAEvaluation } from '@/app/components/DPIAEvaluation/DPIAEvaluation'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type DPIAEvaluationPagePropType = RouteComponentProps

export class DPIAEvaluationPage extends Component<DPIAEvaluationPagePropType> {
  private _dataProcessingActivityId: number

  constructor(props: DPIAEvaluationPagePropType) {
    super(props)

    this._dataProcessingActivityId = Number(
      getUrlParameter(this.props.location.search, 'dataProcessingActivityId'),
    )

    if (!this._dataProcessingActivityId) {
      const errMsg = `DPIAEvaluationPage _dataProcessingActivityId is unknown!!!`
      throw new Error(errMsg)
    }
  }

  render(): ReactElement {
    return (
      <DPIAEvaluation {...this.props} dataProcessingActivityId={this._dataProcessingActivityId} />
    )
  }
}
