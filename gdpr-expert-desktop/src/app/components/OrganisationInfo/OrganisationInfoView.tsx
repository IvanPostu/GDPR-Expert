import { defaultOrganisationImage } from '@/constants/defaultOrganisationImage'
import React, { ReactElement, FC } from 'react'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'

type OrganisationInfoViewPropType = {
  deleteOrganisation: () => void
  updateOrganisation: () => void
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

export const OrganisationInfoView: FC<OrganisationInfoViewPropType> = (
  props: OrganisationInfoViewPropType,
): ReactElement => {
  const data: { [key: string]: string } = {
    'Organizație: ': props.orgName,
    'Forma Legală: ': props.orgLegalForm,
    'Persoană responsabilă: ': props.orgAdministrator,
    'Adresa oficială: ': props.orgAddress,
    'Număr de telefon: ': props.orgPhoneNumber,
    'Email: ': props.orgEmail,
    'Descriere: ': props.orgDescription,
    // 'Numărul de departamente: ': String(props.orgDepartmentCount),
    // 'Numărul de angajanți: ': String(props.orgEmployeeCount),
    'Data fondării: ': props.orgFondationDate,
    'Data înregistrării pe platformă': props.orgPlatformRegistrationDate,
  }

  const content = Object.keys(data).map((item) => (
    <div key={item} className={styles.row}>
      <div className={styles.key}>
        <p>{item}</p>
      </div>
      <div className={styles.val}>
        <p>{data[item]}</p>
      </div>
    </div>
  ))

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.key}>
          <p>Logo: </p>
        </div>
        <div className={styles.val}>
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
      <div className={styles.row}>
        <div />
        <div>
          <GenericButton
            onClick={props.updateOrganisation}
            style={{ background: '#0044AA', marginLeft: '20px' }}
          >
            Modificare organizație
          </GenericButton>
          <GenericButton
            onClick={props.deleteOrganisation}
            style={{ background: '#882222', marginLeft: '20px' }}
          >
            Ștergere organizație
          </GenericButton>
        </div>
        <div />
      </div>
    </div>
  )
}
