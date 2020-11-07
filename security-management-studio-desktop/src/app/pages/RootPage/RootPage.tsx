import React, { ReactElement, FC, PropsWithChildren } from 'react'
import { Redirect } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'

export const RootPage: FC<PropsWithChildren<unknown>> = (): ReactElement => {
  return <Redirect to={routeNames.OrganisationsPageRoute} />
}
