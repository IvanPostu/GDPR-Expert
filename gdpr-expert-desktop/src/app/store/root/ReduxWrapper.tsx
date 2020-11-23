import React, { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from './store'

// const store = storeCreator()

export const ReduxWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <Provider store={configureStore()}>{children}</Provider>
}
