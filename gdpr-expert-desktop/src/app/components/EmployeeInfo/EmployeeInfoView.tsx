import React, { FC, ReactElement } from 'react'
import { Container } from '../Container'
import { EmployeeInfoDataType } from './EmployeeInfo'
import styles from './styles.module.scss'
import { IoMdPerson } from 'react-icons/io'
import { GenericButton } from '../GenericButton'

type EmployeeInfoViewPropType = EmployeeInfoDataType & {
  onUpdateClick: () => void
  onRemoveClick: () => void
}

export const EmployeeInfoView: FC<EmployeeInfoViewPropType> = (
  props: EmployeeInfoViewPropType,
): ReactElement => {
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.preview}>
          <span style={{ fontSize: '90px' }}>
            <IoMdPerson />
          </span>
          <h2>{`${props.firstName} ${props.lastName}`}</h2>
        </div>
        <div className={styles.info}>
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
              onClick={props.onUpdateClick}
              style={{ background: '#2277EE', marginLeft: '20px' }}
            >
              Modificare date
            </GenericButton>
            <GenericButton
              onClick={props.onRemoveClick}
              style={{ background: '#aa2233', marginLeft: '20px' }}
            >
              Ștergere angajant
            </GenericButton>
          </div>
        </div>
      </div>
    </Container>
  )
}
