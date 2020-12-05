import { OrganisationInfo } from '@/app/components/OrganisationInfo/OrganisationInfo'
import React, { ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type OrganisationInfoPagePropType = RouteComponentProps

export function OrganisationInfoPage(props: OrganisationInfoPagePropType): ReactElement {
  return <OrganisationInfo {...props} />
}
