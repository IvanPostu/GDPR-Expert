import { OrganisationInfo } from '@/app/components/OrganisationInfo'
import testImg from '@/app/assets/images/imageadfdaf.jpg'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { OrganisationPageLayout } from '../OrganisationPageLayout'

type OrganisationInfoPageComponentPropType = RouteChildrenProps & PropsWithChildren<unknown>

class OrganisationInfoPageComponent extends Component<OrganisationInfoPageComponentPropType> {
  constructor(props: OrganisationInfoPageComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <OrganisationPageLayout {...this.props}>
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
      </OrganisationPageLayout>
    )
  }
}

export const OrganisationInfoPage = OrganisationInfoPageComponent
