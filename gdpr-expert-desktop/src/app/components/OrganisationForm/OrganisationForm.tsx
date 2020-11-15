import { routeNames } from '@/app/routes/routeNames'
import { GlobalStateType } from '@/app/store'
import { createOrganisation } from '@/app/webApi/organisation/createOrganisation'
import { updateOrganisation } from '@/app/webApi/organisation/updateOrganisation'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { PropsWithChildren, PureComponent, ReactElement, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { RouteChildrenProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { ErrorAlert } from '../CustomAlert/ErrorAlert/ErrorAlert'
import { SuccessAlert } from '../CustomAlert/SuccessAlert/SuccessAlert'
import { OrganisationFormView } from './OrganisationFormView'
import { OrganisationDataType } from './types'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisation: state.organisationInfoReducer.organisation,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type OrganisationFormComponentPropType = RouteChildrenProps &
  PropsWithChildren<unknown> & {
    formType: 'update' | 'create'
  } & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type OrganisationFormComponentStateType = {
  successMessage: string
  errorMessage: string
  organisation: OrganisationDataType
  imageChanged: boolean
}

class OrganisationFormComponent extends PureComponent<
  OrganisationFormComponentPropType,
  OrganisationFormComponentStateType
> {
  private _isMounted: boolean

  constructor(props: OrganisationFormComponentPropType) {
    super(props)

    this._isMounted = false

    if (props.formType === 'create') {
      this.state = {
        errorMessage: '',
        successMessage: '',
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
        errorMessage: '',
        successMessage: '',
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
    this.sessionExpiredHandler = this.sessionExpiredHandler.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  setStateData(data: OrganisationDataType, imageChanged?: boolean): void {
    if (imageChanged !== undefined) {
      this.setState({ organisation: data, imageChanged })
    } else {
      this.setState({ organisation: data })
    }
  }

  sessionExpiredHandler() {
    this.props.clearAuthDataActionCreator()
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

      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const resError = res as UnsuccessResponseData
        this.setState({ successMessage: 'Organizație modificată cu succes.' })
        if (resError.isSessionExpired) {
          this.sessionExpiredHandler()
        }
      } else {
        this.setState({ errorMessage: 'A apărut eroare în procesul modificării organizației.' })
      }
    } else {
      const res = await createOrganisation({
        address,
        base64LogoImage: base64Image,
        description,
        foundedAt,
        email,
        legalForm,
        legalRepresentative,
        telephone,
        organisationName,
      })

      if (!this._isMounted) return
      if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
        const resError = res as UnsuccessResponseData
        this.setState({ successMessage: 'Organizație creată cu succes.' })
        if (resError.isSessionExpired) {
          this.sessionExpiredHandler()
        }
      } else {
        this.setState({ errorMessage: 'A apărut eroare în procesul creării organizației.' })
      }
    }
  }

  render(): ReactElement {
    if (this.state.successMessage) {
      return (
        <SuccessAlert
          onOkClick={() => {
            this.setState({ errorMessage: '', successMessage: '' })
            this.props.history.push(routeNames.OrganisationsPageRoute)
          }}
          text={this.state.successMessage}
        />
      )
    }

    if (this.state.errorMessage) {
      return (
        <ErrorAlert
          onOkClick={() => {
            this.setState({ errorMessage: '', successMessage: '' })
          }}
          text={this.state.errorMessage}
        />
      )
    }

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

export const OrganisationForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganisationFormComponent)
