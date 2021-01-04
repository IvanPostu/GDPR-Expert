import { OrganisationsMenuContainer } from '@/app/components/OrganisationsMenu'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type OrganisationsPagePropType = RouteComponentProps

export class OrganisationsPage extends Component<OrganisationsPagePropType> {
  render(): ReactElement {
    return <OrganisationsMenuContainer {...this.props} />
  }
}
