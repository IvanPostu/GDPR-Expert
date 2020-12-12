import { SeverityEvaluationOfPersonalData } from '@/app/components/SeverityEvaluationOfPersonalData'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type SeverityEvaluationOfPersonalDataPagePropType = RouteComponentProps

class SeverityEvaluationOfPersonalDataPage extends Component<
  SeverityEvaluationOfPersonalDataPagePropType
> {
  private _dataProcessingActivityId: number

  constructor(props: SeverityEvaluationOfPersonalDataPagePropType) {
    super(props)

    this._dataProcessingActivityId = Number(
      getUrlParameter(this.props.location.search, 'dataProcessingActivityId'),
    )

    if (!this._dataProcessingActivityId) {
      const errMsg = `SeverityEvaluationOfPersonalDataPage _dataProcessingActivityId is unknown!!!`
      throw new Error(errMsg)
    }
  }

  render(): ReactElement {
    return (
      <SeverityEvaluationOfPersonalData
        dataProcessingActivityId={this._dataProcessingActivityId}
        {...this.props}
      />
    )
  }
}

export default SeverityEvaluationOfPersonalDataPage
