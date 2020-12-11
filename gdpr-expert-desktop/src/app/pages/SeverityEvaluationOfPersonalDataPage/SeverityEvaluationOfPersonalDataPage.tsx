import { SeverityEvaluationOfPersonalData } from '@/app/components/SeverityEvaluationOfPersonalData'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type SeverityEvaluationOfPersonalDataPagePropType = RouteComponentProps

class SeverityEvaluationOfPersonalDataPage extends Component<
  SeverityEvaluationOfPersonalDataPagePropType
> {
  render(): ReactElement {
    return <SeverityEvaluationOfPersonalData {...this.props} />
  }
}

export default SeverityEvaluationOfPersonalDataPage
