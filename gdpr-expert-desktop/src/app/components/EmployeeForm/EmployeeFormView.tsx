import React, { ReactElement, SyntheticEvent } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { CheckboxA } from '../Form/CheckboxA'
import { FormCardA } from '../Form/FormCardA'
import { TextInputA } from '../Form/TextInputA'
import { EmployeeType } from './types'

type EmployeeFormViewPropType = {
  type: 'create' | 'update'
  departmentName: string
  employee: EmployeeType
  onSubmit: (e: SyntheticEvent) => void
  setEmployeeData: (data: EmployeeType) => void
  redirectToQuestions: () => void
}

export const EmployeeFormView = (props: EmployeeFormViewPropType): ReactElement => {
  const title = props.type === 'create' ? 'Adaugare angajat ' : 'Modificare angajat '
  return (
    <FormCardA onSubmit={props.onSubmit}>
      <h2>{title}</h2>
      <p style={{ marginTop: '10px' }}>
        Pentru departamentul: <b>{props.departmentName}</b>
      </p>

      <TextInputA
        onChange={(e) => props.setEmployeeData({ ...props.employee, lastName: e.target.value })}
        value={props.employee.lastName}
        labelname="Nume:"
        type="text"
      />
      <TextInputA
        onChange={(e) => props.setEmployeeData({ ...props.employee, firstName: e.target.value })}
        value={props.employee.firstName}
        labelname="Prenume:"
        type="text"
      />
      <TextInputA
        onChange={(e) => props.setEmployeeData({ ...props.employee, address: e.target.value })}
        value={props.employee.address}
        labelname="Adresă:"
        type="text"
      />
      <TextInputA
        onChange={(e) => props.setEmployeeData({ ...props.employee, email: e.target.value })}
        value={props.employee.email}
        labelname="Email:"
        type="email"
      />
      <TextInputA
        onChange={(e) => props.setEmployeeData({ ...props.employee, phoneNumber: e.target.value })}
        value={props.employee.phoneNumber}
        labelname="Număr de telefon:"
        type="text"
      />
      <CheckboxA
        onChange={props.redirectToQuestions}
        checked={props.employee.personalDataResponsible}
        labelname="Responsabil de date cu caracter personal: "
      />
      <ButtonA type="submit" title={props.type === 'create' ? 'Adaugă' : 'Modifică'} />
    </FormCardA>
  )
}
