import React, { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import storeCreator from './store.js'

const store = storeCreator()

export const ReduxWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
