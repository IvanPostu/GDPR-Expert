import React, { ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'

export const RootPage = (): ReactElement => {
  const isAuthenticated = false

  if (!isAuthenticated) return <Redirect to={routeNames.LoginPageRoute} />

  return <div></div>
}
