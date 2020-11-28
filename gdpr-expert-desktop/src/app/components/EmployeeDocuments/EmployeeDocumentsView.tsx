import React, { ReactElement } from 'react'
import { IoIosClose } from 'react-icons/io'
import { EmployeeCard } from '../EmployeeCardLayout/EmployeeCard'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'

type EmployeeDocumentsViewPropType = {
  employeeFullName: string
  downloadDocument: (documentId: number, documentName: string) => void
  deleteDocument: (documentId: number) => void
  redirectToEmployeeInfoPage: () => void
  redirectToAddEmployeeDocumentsPage: () => void
  documents: Array<{
    documentId: number
    filename: string
  }>
}

export const EmployeeDocumentsView = (props: EmployeeDocumentsViewPropType): ReactElement => {
  const { employeeFullName, documents } = props
  const documentsContent =
    documents.length > 0
      ? documents.map((item) => (
          <div key={item.documentId} className={styles.line}>
            <div>
              <a onClick={props.downloadDocument.bind(null, item.documentId, item.filename)}>
                {item.filename}
              </a>
            </div>
            <div>
              <span
                onClick={props.deleteDocument.bind(null, item.documentId)}
                className={styles.removeIcon}
              >
                <IoIosClose />
              </span>
            </div>
          </div>
        ))
      : null

  return (
    <EmployeeCard fullname={employeeFullName}>
      <div className={styles.container}>
        <div style={{ minHeight: '110px' }}>
          <h2>Lista de documente pentru angajat</h2>
          {documentsContent}
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
