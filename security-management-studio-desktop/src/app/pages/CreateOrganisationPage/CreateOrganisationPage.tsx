import React, { Component, ReactElement } from 'react'
import { CreateOrganisationPageView } from './CreateOrganisationPageView'
import { OrganisationDataType } from './types'
import { createOrganisation } from '@/app/webApi/organisation/createOrganisation'
import { RouteChildrenProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type CreateOrganisationPageComponentPropType = OrganisationDataType &
  RouteChildrenProps &
  ReturnType<typeof mapDispatchToProps>

type CreateOrganisationPageComponentStatetype = {
  isFetch: boolean
  message: string
  messageColor: string
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
      message: 'Error',
      messageColor: 'red',
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
        base64LogoImage: org.base64Image,
      },
      () => this.props.clearAuthDataActionCreator(),
    )

    if (!createdWithSuccess) {
      this.setState({
        message:
          'A apărut eroare în procesul creării organizației, rugăm să mai încercați din nou.',
        messageColor: 'red',
      })
    }

    if (this._isMounted) {
      this.setState({ isFetch: false })
    }
  }

  render(): ReactElement {
    return (
      <CreateOrganisationPageView
        isLoading={this.state.isFetch}
        onOrganisationCreate={this.organisationCreateHandler}
        clearMessage={() => {
          this.setState({ message: '' })
        }}
        message={this.state.message}
        messageColor={this.state.messageColor}
      />
    )
  }
}

export const CreateOrganisationPage = connect(
  null,
  mapDispatchToProps,
)(CreateOrganisationPageComponent)
