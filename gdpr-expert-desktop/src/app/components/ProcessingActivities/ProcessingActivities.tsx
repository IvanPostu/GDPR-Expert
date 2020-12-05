import { GlobalStateType } from '@/app/store'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { ProcessingActivitiesView } from './ProcessingActivitiesView'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisationName: state.organisationInfoReducer.organisation.organisationName,
    organisationId: state.organisationInfoReducer.organisation.organisationId,
  }
}

type ProcessingActivitiesComponentPropType = RouteComponentProps &
  ReturnType<typeof mapStateToProps>

class ProcessingActivitiesComponent extends Component<ProcessingActivitiesComponentPropType> {
  constructor(props: ProcessingActivitiesComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    return <ProcessingActivitiesView organisationName={this.props.organisationName} />
  }
}

export const ProcessingActivities = connect(mapStateToProps)(ProcessingActivitiesComponent)
