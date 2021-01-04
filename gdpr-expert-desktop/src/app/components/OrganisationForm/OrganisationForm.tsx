import { routeNames } from '@/app/routes/routeNames'
import { GlobalStateType } from '@/app/store'
import { createOrganisation } from '@/app/webApi/organisation/createOrganisation'
import { updateOrganisation } from '@/app/webApi/organisation/updateOrganisation'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { PropsWithChildren, PureComponent, ReactElement, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { RouteChildrenProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { OrganisationFormView } from './OrganisationFormView'
import { OrganisationDataType } from './types'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { MessageBoxWrapper, MessageBoxWrapperPropType } from '../MessageBoxWrapper'
import { FullWidthLoader } from '../BasicLoader'

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
  organisation: OrganisationDataType
  imageChanged: boolean
  isLoad: boolean
  messageBoxState: MessageBoxWrapperPropType
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
        isLoad: false,
        imageChanged: false,
        messageBoxState: {
          message: '',
          onOkClick: alert,
          type: 'success',
        },
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
        isLoad: false,
        imageChanged: false,
        messageBoxState: {
          message: '',
          onOkClick: alert,
          type: 'success',
        },
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
    this.clearMessage = this.clearMessage.bind(this)
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

    this.setState({ isLoad: true })

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
        this.setState({
          isLoad: false,
          messageBoxState: {
            message: 'Organizație modificată cu succes.',
            onOkClick: this.clearMessage.bind(this, routeNames.OrganisationPageRoute),
            type: 'success',
          },
        })
      } else {
        const resError = res as UnsuccessResponseData

        if (resError.isSessionExpired) {
          this.sessionExpiredHandler()
        } else {
          this.setState({
            isLoad: false,
            messageBoxState: {
              message: 'A apărut eroare în procesul modificării organizației.',
              onOkClick: this.clearMessage.bind(this, null),
              type: 'error',
            },
          })
        }
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
        this.setState({
          isLoad: false,
          messageBoxState: {
            message: 'Organizație creată cu succes.',
            onOkClick: this.clearMessage.bind(this, routeNames.OrganisationsPageRoute),
            type: 'success',
          },
        })
      } else {
        const resError = res as UnsuccessResponseData
        if (resError.isSessionExpired) {
          this.sessionExpiredHandler()
        } else {
          this.setState({
            isLoad: false,
            messageBoxState: {
              message: 'A apărut eroare în procesul creării organizației.',
              onOkClick: this.clearMessage.bind(this, null),
              type: 'error',
            },
          })
        }
      }
    }
  }

  clearMessage(redirectUrl: string | null): void {
    if (redirectUrl) {
      this.props.history.push(redirectUrl)
    } else {
      this.setState({ messageBoxState: { message: '', onOkClick: alert, type: 'success' } })
    }
  }

  render(): ReactElement {
    if (this.state.isLoad) {
      return <FullWidthLoader />
    }

    return (
      <MessageBoxWrapper {...this.state.messageBoxState}>
        <OrganisationFormView
          onSubmit={this.onSubmit}
          setStateData={this.setStateData}
          organisation={this.state.organisation}
          formType={this.props.formType}
        />
      </MessageBoxWrapper>
    )
  }
}

export const OrganisationForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganisationFormComponent)
