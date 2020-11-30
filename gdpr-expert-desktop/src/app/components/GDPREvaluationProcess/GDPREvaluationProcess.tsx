import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GDPREvaluationLayout } from '../GDPREvaluationLayout'
import { GDPREvaluationProcessView } from './GDPREvaluationProcessView'

type GDPREvaluationProcessPropType = RouteComponentProps

export class GDPREvaluationProcess extends Component<GDPREvaluationProcessPropType> {
  render(): ReactElement {
    return (
      <GDPREvaluationLayout history={this.props.history}>
        <GDPREvaluationProcessView {...this.props} />
      </GDPREvaluationLayout>
    )
  }
}
