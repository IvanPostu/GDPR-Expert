import { OrganisationForm } from '@/app/components/OrganisationForm/OrganisationForm'
import React, { Component, ReactElement } from 'react'

export class OrganisationUpdatePage extends Component {
  render(): ReactElement {
    return <OrganisationForm formType="update" />
  }
}
