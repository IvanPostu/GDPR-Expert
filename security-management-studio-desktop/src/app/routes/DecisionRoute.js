import React from 'react'
import { Route } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DecisionRoute = ({ trueComponent, falseComponent, decisionFunc, ...rest }) => {
  return <Route {...rest} component={decisionFunc() ? trueComponent : falseComponent} />
}
