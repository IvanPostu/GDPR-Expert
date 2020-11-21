import { routeNames } from '@/app/routes/routeNames'
import React, { FC, ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { BasicLoader } from '../BasicLoader'
import { SuccessButton } from '../Button/SuccessButton'
import { Container } from '../Container'
import { GenericTableA } from '../Tables'
import styles from './styles.module.scss'

type DepartmentInfoViewPropType = {
  departmentInfo: { [key: string]: string }
  departmentName: string
  departmentId: number
  departmentEmployees: Array<{
    id: string
    fullName: string
    address: string
    email: string
    phone: string
    personalDataResponsible: string
  }>
  departmentEmployeesFetching: boolean
}

export const DepartmentInfoView: FC<DepartmentInfoViewPropType> = (
  props: DepartmentInfoViewPropType,
): ReactElement => {
  const employeesIsFetching = props.departmentEmployeesFetching
  const departmentInfo = Object.keys(props.departmentInfo).map((k) => {
    return (
      <div key={k} className={styles.row}>
        <div>
          <h3 className={styles.key}>{k}: </h3>
        </div>
        <div>
          <p className={styles.val}>{props.departmentInfo[k]}</p>
        </div>
      </div>
    )
  })

  const history = useHistory()

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.panel}>
          <h1>Departament: {props.departmentName}</h1>
        </div>
        <div style={{ paddingTop: '10px' }}>{departmentInfo}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.panel}>
          <h1>Angajanți: </h1>
          <div style={{ marginRight: '20px' }}>
            <SuccessButton
              title="Adauga angajant"
              onClick={() => {
                history.push({
                  pathname: routeNames.CreateEmployeePageRoute,
                  search: `?departmentId=${props.departmentId}&departmentName=${props.departmentName}`,
                })
              }}
            />
          </div>
        </div>
        {employeesIsFetching ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <BasicLoader size="100px" />
          </div>
        ) : (
          <EmployeesTable
            onInfoClick={(id) => {
              history.push({
                pathname: routeNames.EmployeeInfoPageRoute,
                search: `?employeeId=${id}`,
              })
            }}
            onUpdateClick={(id) =>
              history.push({
                pathname: routeNames.UpdateEmployeePageRoute,
                search: `?employeeId=${id}&departmentId=${props.departmentId}&departmentName=${props.departmentName}`,
              })
            }
            departmentEmployees={props.departmentEmployees}
          />
        )}
      </div>
    </Container>
  )
}

type EmployeesTablePropType = {
  departmentEmployees: Array<{
    id: string
    fullName: string
    address: string
    email: string
    phone: string
    personalDataResponsible: string
  }>
  onUpdateClick: (id: string) => void
  onInfoClick: (id: string) => void
}

function EmployeesTable(props: EmployeesTablePropType): ReactElement {
  if (props.departmentEmployees.length > 0) {
    return (
      <GenericTableA
        onInfoClick={props.onInfoClick}
        onUpdateClick={props.onUpdateClick}
        headerCells={[
          'Nume/Prenume',
          'Adresa',
          'Email',
          'Nr. telefon',
          'Responsabil de date cu caracter personal',
        ]}
        cells={props.departmentEmployees}
      />
    )
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <h3>Departamentul dat nu conține angajanți.</h3>
      </div>
    )
  }
}
