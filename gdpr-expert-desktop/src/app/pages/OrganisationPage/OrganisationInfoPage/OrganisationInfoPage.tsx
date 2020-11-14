import { OrganisationInfo } from '@/app/components/OrganisationInfo'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { OrganisationPageLayout } from '../OrganisationPageLayout'
import { FullWidthLoader } from '@/app/components/BasicLoader'
import { connect } from 'react-redux'
import { GlobalStateType } from '@/app/store'
import { bindActionCreators, Dispatch } from 'redux'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { removeOrganisation } from '@/app/webApi/organisation/removeOrganisation'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import { routeNames } from '@/app/routes/routeNames'
import { ErrorAlert } from '@/app/components/CustomAlert/ErrorAlert/ErrorAlert'
import { SuccessAlert } from '@/app/components/CustomAlert/SuccessAlert/SuccessAlert'

function mapStateToProps(globalState: GlobalStateType) {
  return {
    isLoading: globalState.organisationInfoReducer.isLoading,
    organisationInfo: globalState.organisationInfoReducer.organisation,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type OrganisationInfoPageComponentPropType = RouteChildrenProps &
  PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type OrganisationInfoPageComponentStateType = {
  isLoading: boolean
  orgDeleteSuccessMessage: string
  orgDeleteFailMessage: string
}

class OrganisationInfoPageComponent extends Component<
  OrganisationInfoPageComponentPropType,
  OrganisationInfoPageComponentStateType
> {
  private _isMounted: boolean

  constructor(props: OrganisationInfoPageComponentPropType) {
    super(props)

    this.state = {
      isLoading: false,
      orgDeleteFailMessage: '',
      orgDeleteSuccessMessage: '',
    }

    this._isMounted = false
    this.deleteOrganisation = this.deleteOrganisation.bind(this)
    this.updateOrganisation = this.updateOrganisation.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  deleteOrganisation(): void {
    const remove = confirm(
      `Doriți complet să ștergeți organizația ${this.props.organisationInfo.organisationName} ?`,
    )

    if (remove) {
      this.setState({ isLoading: true })
      removeOrganisation(Number(this.props.organisationInfo.organisationId)).then((res) => {
        if (!this._isMounted) return
        if (UnsuccessResponseData.isUnsuccessResponseData(res)) {
          const o = res as UnsuccessResponseData
          if (o.isSessionExpired) {
            this.props.clearAuthDataActionCreator()
          } else {
            this.setState({ orgDeleteFailMessage: 'Ștergerea organizației nu a avut loc!' })
          }
        } else {
          this.setState({ orgDeleteSuccessMessage: 'Ștergerea organizației a avut loc!' })
        }
        this.setState({ isLoading: false })
      })
    }
  }

  updateOrganisation() {
    this.props.history.push(routeNames.OrganisationUpdatePage)
  }

  render(): ReactElement {
    const loading = this.props.isLoading || this.state.isLoading

    const content = loading ? (
      <FullWidthLoader />
    ) : (
      <OrganisationInfo
        updateOrganisation={this.updateOrganisation}
        deleteOrganisation={this.deleteOrganisation}
        orgAddress={this.props.organisationInfo.organisationAddress}
        orgAdministrator={this.props.organisationInfo.organisationAdministrator}
        orgDescription={this.props.organisationInfo.organisationDescription}
        orgEmail={this.props.organisationInfo.organisationEmail}
        orgLegalForm={this.props.organisationInfo.organisationLegalForm}
        orgName={this.props.organisationInfo.organisationName}
        orgPhoneNumber={this.props.organisationInfo.organisationPhoneNumber}
        orgLogoImage={this.props.organisationInfo.organisationLogo}
        orgDepartmentCount={Number(this.props.organisationInfo.organisationDepartmentCount)}
        orgEmployeeCount={Number(this.props.organisationInfo.organisationEmployeeCount)}
        orgFondationDate={this.props.organisationInfo.organisationFoundedDate}
        orgPlatformRegistrationDate={
          this.props.organisationInfo.organisationCreatedOnPlatformDateTime.split('T')[0]
        }
      />
    )

    if (this.state.orgDeleteFailMessage) {
      return (
        <ErrorAlert
          text={this.state.orgDeleteFailMessage}
          onOkClick={() => {
            this.setState({ orgDeleteFailMessage: '', orgDeleteSuccessMessage: '' })
          }}
        />
      )
    }

    if (this.state.orgDeleteSuccessMessage) {
      return (
        <SuccessAlert
          text={this.state.orgDeleteSuccessMessage}
          onOkClick={() => {
            this.setState({ orgDeleteFailMessage: '', orgDeleteSuccessMessage: '' })
            this.props.history.push(routeNames.OrganisationsPageRoute)
          }}
        />
      )
    }

    return <OrganisationPageLayout {...this.props}>{content}</OrganisationPageLayout>
  }
}

export const OrganisationInfoPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganisationInfoPageComponent)
