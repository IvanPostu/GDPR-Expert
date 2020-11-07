import React, { FC, PropsWithChildren, ReactElement, Fragment } from 'react'

import { AppRouter } from '@/app/routes/AppRouter'
import { WindowTopBar } from '@/app/components/WindowTopBar'
import { ReduxWrapper } from '@/app/store/root'

const App: FC<PropsWithChildren<unknown>> = (): ReactElement => {
  return (
    <Fragment>
      <WindowTopBar />
      <ReduxWrapper>
        <AppRouter />
      </ReduxWrapper>
    </Fragment>
  )
}

export default App
