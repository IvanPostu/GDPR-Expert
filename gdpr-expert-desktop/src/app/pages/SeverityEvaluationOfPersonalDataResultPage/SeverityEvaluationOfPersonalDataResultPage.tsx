import { SeverityEvaluationOfPersonalDataResult } from '@/app/components/SeverityEvaluationOfPersonalDataResult'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type SeverityEvaluationOfPersonalDataResultPagePropType = RouteComponentProps

export class SeverityEvaluationOfPersonalDataResultPage extends Component<
  SeverityEvaluationOfPersonalDataResultPagePropType
> {
  private _severityEvaluationOfPersonalDataId: number

  constructor(props: SeverityEvaluationOfPersonalDataResultPagePropType) {
    super(props)

    this._severityEvaluationOfPersonalDataId = Number(
      getUrlParameter(this.props.location.search, 'severityEvaluationOfPersonalDataId'),
    )

    if (!this._severityEvaluationOfPersonalDataId) {
      const errMsg = `SeverityEvaluationOfPersonalDataResultPage _severityEvaluationOfPersonalDataId is unknown!!!`
      throw new Error(errMsg)
    }
  }

  render(): ReactElement {
    return (
      <SeverityEvaluationOfPersonalDataResult
        severityEvaluationResultId={this._severityEvaluationOfPersonalDataId}
        {...this.props}
      />
    )
  }
}
