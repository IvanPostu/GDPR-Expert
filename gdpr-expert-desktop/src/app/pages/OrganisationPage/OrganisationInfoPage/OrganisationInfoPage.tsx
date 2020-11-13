import { OrganisationInfo } from '@/app/components/OrganisationInfo'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { OrganisationPageLayout } from '../OrganisationPageLayout'
import { BasicLoader } from '@/app/components/BasicLoader'
import { connect } from 'react-redux'
import { GlobalStateType } from '@/app/store'

function mapStateToProps(globalState: GlobalStateType) {
  return {
    isLoading: globalState.organisationInfoReducer.isLoading,
    organisationInfo: globalState.organisationInfoReducer.organisation,
  }
}

type OrganisationInfoPageComponentPropType = RouteChildrenProps &
  PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps>

class OrganisationInfoPageComponent extends Component<OrganisationInfoPageComponentPropType> {
  constructor(props: OrganisationInfoPageComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    const loading = this.props.isLoading

    const content = loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <BasicLoader size="100px" />
      </div>
    ) : (
      <OrganisationInfo
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
          this.props.organisationInfo.organisationCreatedOnPlatformDateTime
        }
      />
    )

    return <OrganisationPageLayout {...this.props}>{content}</OrganisationPageLayout>
  }
}

export const OrganisationInfoPage = connect(mapStateToProps)(OrganisationInfoPageComponent)
