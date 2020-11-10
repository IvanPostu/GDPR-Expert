import React, { Component, FC, PropsWithChildren, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { GlobalStateType } from '../store'
import { DecisionRoute } from './DecisionRoute'
import { routeNames } from './routeNames'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DecisionRoutePropType = PropsWithChildren<any> & {
  component: Component
}

export const ProtectedRoute: FC<DecisionRoutePropType> = ({
  component,
  path,
  ...rest
}): ReactElement => {
  const isAuthenticated = useSelector(
    (state: GlobalStateType) => state.authenticationReducer.isAuthenticated,
  )

  const loginPage = () => <Redirect to={routeNames.LoginPageRoute} />

  return (
    <DecisionRoute
      {...rest}
      decision={isAuthenticated}
      path={path}
      trueComponent={component}
      falseComponent={loginPage}
    />
  )
}
