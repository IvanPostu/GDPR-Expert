import React, { FC, PropsWithChildren } from 'react'
import { Route } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DecisionRoutePropType = PropsWithChildren<any>

export const DecisionRoute: FC<DecisionRoutePropType> = ({
  trueComponent,
  falseComponent,
  decision,
  ...rest
}) => {
  return <Route {...rest} component={decision ? trueComponent : falseComponent} />
}
