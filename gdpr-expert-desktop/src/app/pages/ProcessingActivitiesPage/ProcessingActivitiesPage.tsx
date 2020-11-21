import { ProcessingActivities } from '@/app/components/ProcessingActivities/ProcessingActivities'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type ProcessingActivitiesPagePropType = RouteComponentProps

export class ProcessingActivitiesPage extends Component<ProcessingActivitiesPagePropType> {
  render(): ReactElement {
    return <ProcessingActivities {...this.props} />
  }
}
