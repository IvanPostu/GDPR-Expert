import { ProcessingActivityForm } from '@/app/components/ProcessingActivityForm/ProcessingActivityForm'
import React, { ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type CreateProcessingActivityPagePropType = RouteComponentProps

export function CreateProcessingActivityPage(
  props: CreateProcessingActivityPagePropType,
): ReactElement {
  return <ProcessingActivityForm type="create" {...props} />
}
