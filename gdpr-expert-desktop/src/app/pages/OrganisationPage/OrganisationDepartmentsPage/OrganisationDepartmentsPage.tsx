import { OrganisationDepartments } from '@/app/components/OrganisationDepartments'
import React, { Component, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router'

type OrganisationDepartmentsPageComponentPropType = RouteComponentProps

class OrganisationDepartmentsPageComponent extends Component<
  OrganisationDepartmentsPageComponentPropType
> {
  render(): ReactElement {
    return <OrganisationDepartments {...this.props} />
  }
}

export const OrganisationDepartmentsPage = OrganisationDepartmentsPageComponent
