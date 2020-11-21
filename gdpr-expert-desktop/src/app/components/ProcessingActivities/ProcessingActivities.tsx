import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProcessingActivitiesView } from './ProcessingActivitiesView'

type ProcessingActivitiesPropType = RouteComponentProps

export class ProcessingActivities extends Component<ProcessingActivitiesPropType> {
  render(): ReactElement {
    return <ProcessingActivitiesView />
  }
}
