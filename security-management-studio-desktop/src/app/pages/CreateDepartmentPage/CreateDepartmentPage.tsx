import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { CreateDepartment } from '@/app/components/CreateDepartment'

type CreateDepartmentPageComponentPropType = PropsWithChildren<unknown>

class CreateDepartmentPageComponent extends Component<CreateDepartmentPageComponentPropType> {
  constructor(props: CreateDepartmentPageComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    return <CreateDepartment onSubmit={() => {}} />
  }
}

export const CreateDepartmentPage = CreateDepartmentPageComponent
