import React, { FunctionComponent, ReactElement, SyntheticEvent } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { FormCardA } from '../Form/FormCardA'
import { TextInputA } from '../Form/TextInputA'
import { DepartmentDataType } from './types'

type DepartmentFormViewPropType = {
  organisationName: string
  formType: 'update' | 'create'
  department: DepartmentDataType
  setDepartmentData: (data: DepartmentDataType) => void
  onSubmit: (e: SyntheticEvent) => void
}

export const DepartmentFormView: FunctionComponent<DepartmentFormViewPropType> = (
  props: DepartmentFormViewPropType,
): ReactElement => {
  const title = props.formType === 'update' ? 'Modificare departament' : 'Creare departament'

  return (
    <FormCardA onSubmit={props.onSubmit}>
      <h1>{title}</h1>
      <p>
        Pentru organizația: <b>{props.organisationName}</b>
      </p>
      <TextInputA
        onChange={(e) =>
          props.setDepartmentData({
            ...props.department,
            name: e.target.value,
          })
        }
        value={props.department.name}
        labelname="Denumire:"
      />
      <TextInputA
        onChange={(e) =>
          props.setDepartmentData({
            ...props.department,
            phone: e.target.value,
          })
        }
        value={props.department.phone}
        labelname="Telefon:"
      />
      <TextInputA
        onChange={(e) =>
          props.setDepartmentData({
            ...props.department,
            email: e.target.value,
          })
        }
        value={props.department.email}
        type="email"
        labelname="Email:"
      />
      <TextInputA
        onChange={(e) =>
          props.setDepartmentData({
            ...props.department,
            responsiblePerson: e.target.value,
          })
        }
        value={props.department.responsiblePerson}
        labelname="Persoană responsabilă:"
      />
      <ButtonA type="submit" title="Salvează" />
    </FormCardA>
  )
}
