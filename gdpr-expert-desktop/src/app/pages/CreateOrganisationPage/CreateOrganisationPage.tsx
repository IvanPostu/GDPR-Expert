import { OrganisationForm } from '@/app/components/OrganisationForm/OrganisationForm'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type CreateOrganisationPagePropType = RouteComponentProps

export class CreateOrganisationPage extends Component<CreateOrganisationPagePropType> {
  render(): ReactElement {
    return <OrganisationForm {...this.props} formType="create" />
  }
}
