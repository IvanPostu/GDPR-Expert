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
    <FormCardA cardBackgroundColor="rgba(255, 255, 255, 0.97)" onSubmit={onSubmit}>
      <h2>Adaugare angajant </h2>
      <p style={{ marginTop: '10px' }}>
        Pentru departamentul: <b>{props.departmentName}</b>
      </p>

      <TextInputA
        labelName="Nume:"
        type="text"
        onTextChange={(str: string) => setEmployeeData((prev) => ({ ...prev, lastName: str }))}
      />
      <TextInputA
        labelName="Prenume:"
        type="text"
        onTextChange={(str: string) => setEmployeeData((prev) => ({ ...prev, firstName: str }))}
      />
      <TextInputA
        labelName="Adresă:"
        type="text"
        onTextChange={(str: string) => setEmployeeData((prev) => ({ ...prev, address: str }))}
      />
      <TextInputA
        labelName="Email:"
        type="email"
        onTextChange={(str: string) => setEmployeeData((prev) => ({ ...prev, email: str }))}
      />
      <TextInputA
        labelName="Număr de telefon:"
        type="text"
        onTextChange={(str: string) => setEmployeeData((prev) => ({ ...prev, phoneNumber: str }))}
      />
      <CheckboxA
        onChange={props.onPersonalDataResponsibleCheckboxClick}
        checked={props.personalDataResponsibleChecked}
        labelName="Responsabil de date cu caracter personal: "
      />
      <ButtonA type="submit" title="Adaugă" />
    </FormCardA>
  )
}
