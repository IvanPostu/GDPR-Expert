import { OrganisationForm } from '@/app/components/OrganisationForm/OrganisationForm'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type OrganisationUpdatePagePropType = RouteComponentProps

export class OrganisationUpdatePage extends Component<OrganisationUpdatePagePropType> {
  render(): ReactElement {
    return <OrganisationForm {...this.props} formType="update" />
  }
}
