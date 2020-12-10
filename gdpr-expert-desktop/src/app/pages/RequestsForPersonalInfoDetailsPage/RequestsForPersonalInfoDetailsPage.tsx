import { RequestForPersonalInfoDetails } from '@/app/components/RequestForPersonalInfoDetails'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type RequestsForPersonalInfoDetailsPagePropType = RouteComponentProps

export class RequestsForPersonalInfoDetailsPage extends Component<
  RequestsForPersonalInfoDetailsPagePropType
> {
  private _requestForPersonalInfoId: number

  constructor(props: RequestsForPersonalInfoDetailsPagePropType) {
    super(props)

    this._requestForPersonalInfoId = Number(
      getUrlParameter(this.props.location.search, 'requestForPersonalInfoId'),
    )

    if (!this._requestForPersonalInfoId) {
      throw new Error(`RequestsForPersonalInfoDetailsPage _requestForPersonalInfoId is unknown!!!`)
    }
  }

  render(): ReactElement {
    return (
      <RequestForPersonalInfoDetails
        requestForPersonalInfoId={this._requestForPersonalInfoId}
        {...this.props}
      />
    )
  }
}
