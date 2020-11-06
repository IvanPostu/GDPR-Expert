import React, { Component, ReactElement } from 'react'
import { CreateOrganisationPageView } from './CreateOrganisationPageView'
import { OrganisationDataType } from './types'
import { createOrganisation } from '@/app/webApi/organisation/createOrganisation'
import { Route, RouteChildrenProps } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'

type CreateOrganisationPageComponentPropType = OrganisationDataType & RouteChildrenProps

type CreateOrganisationPageComponentStatetype = {
  isFetch: boolean
}

class CreateOrganisationPageComponent extends Component<
  CreateOrganisationPageComponentPropType,
  CreateOrganisationPageComponentStatetype
> {
  private _isMounted: boolean

  constructor(props: CreateOrganisationPageComponentPropType) {
    super(props)
    this._isMounted = false

    this.state = {
      isFetch: false,
    }

    this.organisationCreateHandler = this.organisationCreateHandler.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  async organisationCreateHandler(org: OrganisationDataType): Promise<void> {
    this.setState({ isFetch: true })
    const createdWithSuccess = await createOrganisation(
      {
        address: org.address,
        description: org.description,
        email: org.email,
        legalForm: org.legalForm,
        legalRepresentative: org.legalRepresentative,
        organisationName: org.organisationName,
        telephone: org.telephone,
        base64LogoImage: '',
      },
      () => this.props.history.push(routeNames.LoginPageRoute),
    )

    if (this._isMounted) {
      this.setState({ isFetch: false })
    }
  }

  render(): ReactElement {
    return (
      <CreateOrganisationPageView
        isLoading={this.state.isFetch}
        onOrganisationCreate={this.organisationCreateHandler}
      />
    )
  }
}

export const CreateOrganisationPage = CreateOrganisationPageComponent
