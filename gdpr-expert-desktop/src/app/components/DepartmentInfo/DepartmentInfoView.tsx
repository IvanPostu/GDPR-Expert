import { routeNames } from '@/app/routes/routeNames'
import React, { FC, ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { SuccessButton } from '../Button/SuccessButton'
import { Container } from '../Container'
import { GenericTableA } from '../Tables'
import styles from './styles.module.scss'

type DepartmentInfoViewPropType = {
  departmentInfo: { [key: string]: string }
  departmentName: string
  departmentId: number
}

export const DepartmentInfoView: FC<DepartmentInfoViewPropType> = (
  props: DepartmentInfoViewPropType,
): ReactElement => {
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

  const cells = [1, 2, 3].map((item, i) => ({
    id: String(i),
    fullName: 'AAA',
    address: 'BBB',
    email: 'emailadfadf',
    phone: 'phone',
    responsible: 'Da',
  }))

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
        <GenericTableA
          onDeleteClick={(id) => console.log(id)}
          onInfoClick={(id) => console.log(id)}
          onUpdateClick={(id) => console.log(id)}
          headerCells={[
            'Nume/Prenume',
            'Adresa',
            'Email',
            'Nr. telefon',
            'Responsabil de date cu caracter personal',
          ]}
          cells={cells}
        />
      </div>
    </Container>
  )
}
