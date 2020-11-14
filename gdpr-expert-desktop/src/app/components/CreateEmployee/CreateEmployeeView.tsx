import React, { ChangeEvent, FC, ReactElement, SyntheticEvent, useCallback, useState } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { CheckboxA } from '../Form/CheckboxA'
import { FormCardA } from '../Form/FormCardA'
import { TextInputA } from '../Form/TextInputA'

export type EmployeeDataType = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  personalDataResponsible: boolean
}

type CreateEmployeeViewPropType = {
  onSubmit: (data: EmployeeDataType) => void
  departmentName: string
  onPersonalDataResponsibleCheckboxClick: (e: ChangeEvent<HTMLInputElement>) => void
  personalDataResponsibleChecked: boolean
}

export const CreateEmployeeView: FC<CreateEmployeeViewPropType> = (
  props: CreateEmployeeViewPropType,
): ReactElement => {
  const [employeeData, setEmployeeData] = useState<EmployeeDataType>({
    lastName: '',
    firstName: '',
    address: '',
    email: '',
    phoneNumber: '',
    personalDataResponsible: false,
  })

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      props.onSubmit(employeeData)
    },
    [employeeData],
  )

  return (
    <FormCardA onSubmit={onSubmit}>
      <h2>Adaugare angajant </h2>
      <p style={{ marginTop: '10px' }}>
        Pentru departamentul: <b>{props.departmentName}</b>
      </p>

      <TextInputA
        labelname="Nume:"
        type="text"
        onChange={(e) => setEmployeeData((prev) => ({ ...prev, lastName: e.target.value }))}
      />
      <TextInputA
        labelname="Prenume:"
        type="text"
        onChange={(e) => setEmployeeData((prev) => ({ ...prev, firstName: e.target.value }))}
      />
      <TextInputA
        labelname="Adresă:"
        type="text"
        onChange={(e) => setEmployeeData((prev) => ({ ...prev, address: e.target.value }))}
      />
      <TextInputA
        labelname="Email:"
        type="email"
        onChange={(e) => setEmployeeData((prev) => ({ ...prev, email: e.target.value }))}
      />
      <TextInputA
        labelname="Număr de telefon:"
        type="text"
        onChange={(e) => setEmployeeData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
      />
      <CheckboxA
        onChange={props.onPersonalDataResponsibleCheckboxClick}
        checked={props.personalDataResponsibleChecked}
        labelname="Responsabil de date cu caracter personal: "
      />
      <ButtonA type="submit" title="Adaugă" />
    </FormCardA>
  )
}
