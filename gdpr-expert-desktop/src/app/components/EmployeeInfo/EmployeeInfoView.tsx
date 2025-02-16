import React, { ReactElement } from 'react'
import { GenericButton } from '@/app/components/GenericButton'
import { EmployeeCard } from '../EmployeeCardLayout/EmployeeCard'
import styles from './styles.module.scss'
import { EmployeeInfoDataType } from './EmployeeInfo'

type EmployeeInfoViewPropType = EmployeeInfoDataType & {
  onUpdateClick: () => void
  onRemoveClick: () => void
  onShowDocumentListClick: () => void
}

export const EmployeeInfoView = (props: EmployeeInfoViewPropType): ReactElement => {
  return (
    <EmployeeCard fullname={`${props.firstName} ${props.lastName}`}>
      <div className={styles.container}>
        <div className={styles.line}>
          <div>
            <b>Adresa de locuință</b>
          </div>
          <div>
            <p>{props.address}</p>
          </div>
        </div>

        <div className={styles.line}>
          <div>
            <b>Poșta electronică</b>
          </div>
          <div>
            <p>{props.email}</p>
          </div>
        </div>

        <div className={styles.line}>
          <div>
            <b>Denumire de departament</b>
          </div>
          <div>
            <p>{props.departmentName}</p>
          </div>
        </div>

        <div className={styles.line}>
          <div>
            <b>Responsabil de date cu caracter personal</b>
          </div>
          <div>
            <p>{props.personalDataResponsible ? 'Da' : 'Nu'}</p>
          </div>
        </div>

        <div className={styles.line}>
          <div>
            <b>Număr de telefon</b>
          </div>
          <div>
            <p>{props.phoneNumber}</p>
          </div>
        </div>

        <div className={styles.line} style={{ marginTop: '20px' }}>
          <GenericButton
            className={styles.btn}
            onClick={props.onShowDocumentListClick}
            style={{ background: '#2277EE' }}
          >
            Lista de documente
          </GenericButton>
          <GenericButton
            className={styles.btn}
            onClick={props.onUpdateClick}
            style={{ background: '#2277EE' }}
          >
            Modificare date despre angajat
          </GenericButton>
          <GenericButton
            className={styles.btn}
            onClick={props.onRemoveClick}
            style={{ background: '#aa2233' }}
          >
            Ștergere angajat
          </GenericButton>
        </div>
      </div>
    </EmployeeCard>
  )
}
