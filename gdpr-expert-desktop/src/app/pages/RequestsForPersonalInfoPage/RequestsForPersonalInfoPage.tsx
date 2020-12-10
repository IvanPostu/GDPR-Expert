import { RequestsForPersonalInfo } from '@/app/components/RequestsForPersonalInfo'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type RequestsForPersonalInfoPagePropType = RouteComponentProps

export class RequestsForPersonalInfoPage extends Component<RequestsForPersonalInfoPagePropType> {
  render(): ReactElement {
    return <RequestsForPersonalInfo {...this.props} />
  }
}
