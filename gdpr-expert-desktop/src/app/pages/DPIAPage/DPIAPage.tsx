import { DataProtectionImpactAssessment } from '@/app/components/DataProtectionImpactAssessment'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type DPIAPagePropType = RouteComponentProps

export default class DPIAPage extends Component<DPIAPagePropType> {
  private _dataProcessingActivityId: number

  constructor(props: DPIAPagePropType) {
    super(props)

    this._dataProcessingActivityId = Number(
      getUrlParameter(this.props.location.search, 'dataProcessingActivityId'),
    )

    if (!this._dataProcessingActivityId) {
      const errMsg = `DPIAPage _dataProcessingActivityId is unknown!!!`
      throw new Error(errMsg)
    }
  }

  render(): ReactElement {
    return (
      <DataProtectionImpactAssessment
        {...this.props}
        dataProcessingActivityId={this._dataProcessingActivityId}
      />
    )
  }
}
