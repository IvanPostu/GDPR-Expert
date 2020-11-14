import { GlobalStateType } from '@/app/store'
import { updateOrganisation } from '@/app/webApi/organisation/updateOrganisation'
import React, { PropsWithChildren, PureComponent, ReactElement, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { OrganisationFormView } from './OrganisationFormView'
import { OrganisationDataType } from './types'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisation: state.organisationInfoReducer.organisation,
  }
}

type OrganisationFormComponentPropType = PropsWithChildren<unknown> & {
  formType: 'update' | 'create'
} & ReturnType<typeof mapStateToProps>

type OrganisationFormComponentStateType = {
  organisation: OrganisationDataType
  imageChanged: boolean
}

class OrganisationFormComponent extends PureComponent<
  OrganisationFormComponentPropType,
  OrganisationFormComponentStateType
> {
  constructor(props: OrganisationFormComponentPropType) {
    super(props)

    if (props.formType === 'create') {
      this.state = {
        imageChanged: false,
        organisation: {
          id: 0,
          address: '',
          base64Image: '',
          description: '',
          email: '',
          foundedAt: '',
          legalForm: '',
          legalRepresentative: '',
          organisationName: '',
          telephone: '',
        },
      }
    } else {
      const {
        organisationAddress,
        organisationAdministrator,
        organisationDescription,
        organisationId,
        organisationEmail,
        organisationFoundedDate,
        organisationLegalForm,
        organisationLogo,
        organisationName,
        organisationPhoneNumber,
      } = props.organisation

      this.state = {
        imageChanged: false,
        organisation: {
          id: Number(organisationId),
          address: organisationAddress,
          base64Image: organisationLogo,
          description: organisationDescription,
          email: organisationEmail,
          foundedAt: organisationFoundedDate,
          legalForm: organisationLegalForm,
          legalRepresentative: organisationAdministrator,
          organisationName: organisationName,
          telephone: organisationPhoneNumber,
        },
      }
    }

    this.setStateData = this.setStateData.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  setStateData(data: OrganisationDataType, imageChanged?: boolean): void {
    if (imageChanged !== undefined) {
      this.setState({ organisation: data, imageChanged })
    } else {
      this.setState({ organisation: data })
    }
  }

  async onSubmit(e: SyntheticEvent) {
    e.preventDefault()
    const {
      address,
      base64Image,
      description,
      foundedAt,
      email,
      legalForm,
      id,
      legalRepresentative,
      organisationName,
      telephone,
    } = this.state.organisation
    if (this.props.formType === 'update') {
      const res = await updateOrganisation({
        id,
        address,
        base64LogoImage: this.state.imageChanged ? base64Image : '',
        description,
        foundedAt,
        email,
        legalForm,
        legalRepresentative,
        telephone,
        organisationName,
      })
      console.log(res)
    }
  }

  render(): ReactElement {
    return (
      <OrganisationFormView
        onSubmit={this.onSubmit}
        setStateData={this.setStateData}
        organisation={this.state.organisation}
        formType={this.props.formType}
      />
    )
  }
}

export const OrganisationForm = connect(mapStateToProps)(OrganisationFormComponent)
