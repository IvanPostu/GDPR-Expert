import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FullWidthLoader } from '../BasicLoader'
import { ProcessingActivityFormView } from './ProcessingActivityFormView'
import { ProcessingPersonalDataActivity } from './types'

type ProcessingActivityFormComponentPropType = RouteComponentProps & {
  type: 'update' | 'create'
}

type ProcessingActivityFormComponentStateType = {
  isLoad: boolean
  activity: ProcessingPersonalDataActivity
}

class ProcessingActivityFormComponent extends Component<
  ProcessingActivityFormComponentPropType,
  ProcessingActivityFormComponentStateType
> {
  constructor(props: ProcessingActivityFormComponentPropType) {
    super(props)

    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    this.state = {
      isLoad: false,
      activity: {
        activityName: '',
        activityOwner: '',
        beginningOfTheActivity: today.toISOString().split('T')[0],
        endOfTheActivity: tomorrow.toISOString().split('T')[0],
        dataIsSensible: false,
        departmentId: 0,
        description: '',
        purposes: '',
      },
    }

    this.setActivityData = this.setActivityData.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  setActivityData(newActivity: ProcessingPersonalDataActivity): void {
    this.setState({ activity: newActivity })
  }

  onSubmit(e: SyntheticEvent): void {
    e.preventDefault()
    // console.log(this.state.activity)
  }

  render(): ReactElement {
    if (this.state.isLoad) return <FullWidthLoader />

    return (
      <ProcessingActivityFormView
        onSubmit={this.onSubmit}
        activity={this.state.activity}
        setActivityData={this.setActivityData}
        type={this.props.type}
        departments={[
          { id: 1, name: 'aaa' },
          { id: 2, name: 'bbb' },
        ]}
      />
    )
  }
}

export const ProcessingActivityForm = ProcessingActivityFormComponent
