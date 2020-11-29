import { GDPREvaluationProcess } from '@/app/components/GDPREvaluationProcess/GDPREvaluationProcess'
import React, { FC, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type GDPREvaluationPagePropType = RouteComponentProps

export const GDPREvaluationPage: FC<GDPREvaluationPagePropType> = (
  props: GDPREvaluationPagePropType,
): ReactElement => {
  return <GDPREvaluationProcess {...props} />
}
