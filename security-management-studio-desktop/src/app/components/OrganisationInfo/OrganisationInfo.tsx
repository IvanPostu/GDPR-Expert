import { defaultOrganisationImage } from '@/app/constants/defaultOrganisationImage'
import React, { ReactElement, FC } from 'react'
import styles from './styles.module.scss'

type OrganisationInfoPropType = {
  orgName: string
  orgLegalForm: string
  orgAdministrator: string
  orgAddress: string
  orgPhoneNumber: string
  orgEmail: string
  orgDescription: string
  orgFondationDate: string
  orgPlatformRegistrationDate: string
  orgEmployeeCount: number
  orgDepartmentCount: number
  orgLogoImage: string
}

export const OrganisationInfo: FC<OrganisationInfoPropType> = (
  props: OrganisationInfoPropType,
): ReactElement => {
  const data: { [key: string]: string } = {
    'Organizație: ': props.orgName,
    'Forma Legală: ': props.orgLegalForm,
    'Persoană responsabilă: ': props.orgAdministrator,
    'Adresa oficială: ': props.orgAddress,
    'Număr de telefon: ': props.orgPhoneNumber,
    'Email: ': props.orgEmail,
    'Descriere: ': props.orgDescription,
    'Numărul de departamente: ': String(props.orgDepartmentCount),
    'Numărul de angajanți: ': String(props.orgEmployeeCount),
    'Data fondării: ': props.orgFondationDate,
    'Data înregistrării pe platformă': props.orgPlatformRegistrationDate,
  }

  const content = Object.keys(data).map((item) => (
    <div key={item} className={styles.row}>
      <div>
        <p className={styles.key}>{item}</p>
      </div>
      <div>
        <p className={styles.val}>{data[item]}</p>
      </div>
    </div>
  ))

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div>
          <p className={styles.key}>Logo: </p>
        </div>
        <div>
          <img
            style={{ marginRight: '20px' }}
            src={props.orgLogoImage ? props.orgLogoImage : defaultOrganisationImage}
            width="150px"
            height="150px"
            alt=""
          />
        </div>
      </div>
      {content}
    </div>
  )
}
