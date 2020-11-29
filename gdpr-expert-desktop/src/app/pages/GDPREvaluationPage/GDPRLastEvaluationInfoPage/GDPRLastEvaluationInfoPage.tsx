import { GDPREvaluationLayout } from '@/app/components/GDPREvaluationLayout'
import React, { FC, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type GDPRLastEvaluationInfoPagePropType = RouteComponentProps

export const GDPRLastEvaluationInfoPage: FC<GDPRLastEvaluationInfoPagePropType> = (): ReactElement => {
  return (
    <GDPREvaluationLayout>
      <h1>GDPRLastEvaluationInfoPage</h1>
    </GDPREvaluationLayout>
  )
}
