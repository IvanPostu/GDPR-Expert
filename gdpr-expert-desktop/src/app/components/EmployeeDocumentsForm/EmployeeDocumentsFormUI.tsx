import React, { ReactElement, SyntheticEvent } from 'react'
import { EmployeeCard } from '../EmployeeCardLayout/EmployeeCard'
import { FilesInputA } from '../Form/FilesInputA'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'

type EmployeeDocumentsFormUIPropType = {
  employeeFullName: string
  files: Array<{
    id: string
    file: File
  }>
  onSubmit: (e: SyntheticEvent) => void
  remove: (id: string) => void
  onAddFiles: (f: FileList) => void
}

export const EmployeeDocumentsFormUI = (props: EmployeeDocumentsFormUIPropType): ReactElement => {
  const { employeeFullName, files } = props
  return (
    <EmployeeCard fullname={employeeFullName}>
      <div className={styles.container}>
        <div style={{ minHeight: '110px' }}>
          <h2>Adaugare documente pentru angajat</h2>
          <form onSubmit={props.onSubmit}>
            <FilesInputA remove={props.remove} files={files} onAddFiles={props.onAddFiles} />
            <div>
              <GenericButton className={styles.submitButton}>Salvează</GenericButton>
            </div>
          </form>
        </div>
      </div>
    </EmployeeCard>
  )
}
