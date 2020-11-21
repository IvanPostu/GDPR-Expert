import React, { FC, PropsWithChildren, ReactElement, Fragment, useState } from 'react'

import { AppRouter } from '@/app/routes/AppRouter'
import { WindowTopBar } from '@/app/components/WindowTopBar'
import { ReduxWrapper } from '@/app/store/root'
import { StartupLoader } from '@/app/components/StartupLoader'
import { isShowed } from '@/app/constants/startup'

const App: FC<PropsWithChildren<unknown>> = (): ReactElement => {
  const [startupLoaderIsShowed, setStartupLoaderIsShowed] = useState(isShowed)

  if (startupLoaderIsShowed) {
    return <StartupLoader onComplete={() => setStartupLoaderIsShowed(false)} />
  } else {
    return (
      <Fragment>
        <ReduxWrapper>
          <AppRouter />
        </ReduxWrapper>
      </Fragment>
    )
  }
}

export default App
