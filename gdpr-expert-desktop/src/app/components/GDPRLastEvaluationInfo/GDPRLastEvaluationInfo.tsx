import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GDPREvaluationLayout } from '../GDPREvaluationLayout'
import { GDPRLastEvaluationInfoView } from './GDPRLastEvaluationInfoView'

type GDPRLastEvaluationInfoPropType = RouteComponentProps

export class GDPRLastEvaluationInfo extends Component<GDPRLastEvaluationInfoPropType> {
  render(): ReactElement {
    return (
      <GDPREvaluationLayout history={this.props.history}>
        <GDPRLastEvaluationInfoView />
      </GDPREvaluationLayout>
    )
  }
}
