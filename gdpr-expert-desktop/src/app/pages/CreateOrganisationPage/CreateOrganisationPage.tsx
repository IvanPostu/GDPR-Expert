import React, { Component, ReactElement } from 'react'
import { CreateOrganisationPageView } from './CreateOrganisationPageView'
import { OrganisationDataType } from './types'
import { createOrganisation } from '@/app/webApi/organisation/createOrganisation'
import { Redirect, RouteChildrenProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'
import { routeNames } from '@/app/routes/routeNames'
import { fetchOrganisationsActionCreator } from '@/app/store/Organisations/actionCreators'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator, fetchOrganisationsActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type CreateOrganisationPageComponentPropType = OrganisationDataType &
  RouteChildrenProps &
  ReturnType<typeof mapDispatchToProps>

type CreateOrganisationPageComponentStatetype = {
  isFetch: boolean
  message: string
  isErrorMessage: boolean
  redirectToOrganisations: boolean
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
      isErrorMessage: false,
      message: '',
      redirectToOrganisations: false,
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
    const organisationId = await createOrganisation({
      address: org.address,
      description: org.description,
      email: org.email,
      legalForm: org.legalForm,
      legalRepresentative: org.legalRepresentative,
      organisationName: org.organisationName,
      telephone: org.telephone,
      base64LogoImage: org.base64Image,
      foundedAt: org.foundedAt,
    })

    if (!organisationId) {
      this.setState({
        isErrorMessage: true,
        message:
          'A apărut eroare în procesul creării organizației, rugăm să mai încercați din nou.',
      })
    } else {
      this.setState({
        isErrorMessage: false,
        message: 'Organizația a fost creată cu succes.',
      })
    }

    if (this._isMounted) {
      this.setState({ isFetch: false })
    }
  }

  render(): ReactElement {
    if (this.state.redirectToOrganisations) {
      return <Redirect to={routeNames.OrganisationsPageRoute} />
    }

    return (
      <CreateOrganisationPageView
        isLoading={this.state.isFetch}
        onOrganisationCreate={this.organisationCreateHandler}
        clearMessage={() => {
          this.setState({ message: '' })
        }}
        onSuccess={() => {
          this.props.fetchOrganisationsActionCreator()
          this.setState({ redirectToOrganisations: true })
        }}
        message={this.state.message}
        isErrorMessage={this.state.isErrorMessage}
      />
    )
  }
}

export const CreateOrganisationPage = connect(
  null,
  mapDispatchToProps,
)(CreateOrganisationPageComponent)
