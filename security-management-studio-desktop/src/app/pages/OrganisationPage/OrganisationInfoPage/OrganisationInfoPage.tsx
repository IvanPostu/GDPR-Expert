import { OrganisationInfo } from '@/app/components/OrganisationInfo'
import testImg from '@/app/assets/images/imageadfdaf.jpg'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { OrganisationPageLayout } from '../OrganisationPageLayout'
import { BasicLoader } from '@/app/components/BasicLoader'

type OrganisationInfoPageComponentPropType = RouteChildrenProps & PropsWithChildren<unknown>

class OrganisationInfoPageComponent extends Component<OrganisationInfoPageComponentPropType> {
  constructor(props: OrganisationInfoPageComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    const loading = false

    const content = loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <BasicLoader size="100px" />
      </div>
    ) : (
      <OrganisationInfo
        orgAddress="adr1"
        orgAdministrator="Abc Cde"
        orgDescription="Simple description."
        orgEmail="qwerty@mail.ru"
        orgLegalForm="S.R.L."
        orgName="Coca cola"
        orgPhoneNumber="06714 614376 731 "
        orgLogoImage={testImg}
        orgDepartmentCount={12}
        orgEmployeeCount={56}
        orgFondationDate={'08.08.2010'}
        orgPlatformRegistrationDate={'08.12.2010'}
      />
    )

    return <OrganisationPageLayout {...this.props}>{content}</OrganisationPageLayout>
  }
}

export const OrganisationInfoPage = OrganisationInfoPageComponent
