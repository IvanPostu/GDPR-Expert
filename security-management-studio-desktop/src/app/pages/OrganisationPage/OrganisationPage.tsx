import React, { Component, ReactElement } from 'react'
import { Container } from '@/app/components/Container'
import { SuccessButton } from '@/app/components/Button/SuccessButton'
import styles from './styles.module.scss'
import { OrganisationInfo } from '@/app/components/OrganisationInfo'
import { BasicLoader } from '@/app/components/BasicLoader'
import testImg from '@/app/assets/images/imageadfdaf.jpg'

class OrganisationPageComponent extends Component {
  render(): ReactElement {
    const loading = false
    const content = loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
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
        orgPlatformRegistrationDate={'08.08.2010'}
      />
    )

    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.panel}>
            <SuccessButton title="Informație de bază" />
            <SuccessButton title="Departamente" />
            <SuccessButton title="Angajanți" />
          </div>
          {content}
        </div>
      </Container>
    )
  }
}

export const OrganisationPage = OrganisationPageComponent
