import React, { ReactElement } from 'react'
import { IoIosClose } from 'react-icons/io'
import { EmployeeCard } from '../EmployeeCardLayout/EmployeeCard'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'

type EmployeeDocumentsViewPropType = {
  employeeFullName: string
  redirectToEmployeeInfoPage: () => void
  redirectToAddEmployeeDocumentsPage: () => void
}

export const EmployeeDocumentsView = (props: EmployeeDocumentsViewPropType): ReactElement => {
  const { employeeFullName } = props
  return (
    <EmployeeCard fullname={employeeFullName}>
      <div className={styles.container}>
        <div style={{ minHeight: '110px' }}>
          <h2>Lista de documente pentru angajat</h2>
          <div className={styles.line}>
            <div>
              <a>document1.doc</a>
            </div>
            <div>
              <span className={styles.removeIcon}>
                <IoIosClose />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.line} style={{ marginTop: '20px' }}>
          <div>
            <GenericButton
              onClick={props.redirectToEmployeeInfoPage}
              style={{ background: '#2277EE', marginLeft: '5px' }}
            >
              Informație despre angajat
            </GenericButton>
            <GenericButton
              onClick={props.redirectToAddEmployeeDocumentsPage}
              style={{ background: '#2277EE', marginLeft: '5px' }}
            >
              Adaugare documente
            </GenericButton>
          </div>
          <div></div>
        </div>
      </div>
    </EmployeeCard>
  )
}
