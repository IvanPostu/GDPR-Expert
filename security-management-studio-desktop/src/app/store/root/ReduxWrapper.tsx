import React, { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

export const ReduxWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
