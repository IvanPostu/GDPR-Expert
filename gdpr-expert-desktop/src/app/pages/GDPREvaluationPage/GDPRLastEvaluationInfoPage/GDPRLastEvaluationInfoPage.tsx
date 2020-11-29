import { GDPRLastEvaluationInfo } from '@/app/components/GDPRLastEvaluationInfo'
import React, { FC, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type GDPRLastEvaluationInfoPagePropType = RouteComponentProps

export const GDPRLastEvaluationInfoPage: FC<GDPRLastEvaluationInfoPagePropType> = (
  props: GDPRLastEvaluationInfoPagePropType,
): ReactElement => {
  return <GDPRLastEvaluationInfo {...props} />
}
