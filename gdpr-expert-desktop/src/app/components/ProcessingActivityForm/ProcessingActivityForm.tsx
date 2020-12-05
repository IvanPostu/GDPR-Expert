import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProcessingActivityFormView } from './ProcessingActivityFormView'

type ProcessingActivityFormComponentPropType = RouteComponentProps

export class ProcessingActivityFormComponent extends Component<
  ProcessingActivityFormComponentPropType
> {
  constructor(props: ProcessingActivityFormComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    return <ProcessingActivityFormView />
  }
}
