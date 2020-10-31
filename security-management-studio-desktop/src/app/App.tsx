import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { HashRouter, Link, Route } from 'react-router-dom'

import { HomePage } from '@/app/pages/HomePage'
import { AboutPage } from '@/app/pages/AboutPage'
import { WindowTopBar } from '@/app/components/WindowTopBar'
import { Header } from '@/app/components/Header'
import { routeNames } from '@/app/routes/routeNames'

const App: FC<PropsWithChildren<unknown>> = (): ReactElement => {
  return (
    <HashRouter>
      <WindowTopBar />
      <Header />
      <Link to={routeNames.HomeRoute}>Home</Link>
      <Link to={routeNames.AboutRoute}>About</Link>
      <Route path={[routeNames.HomeRoute, '/']} exact component={HomePage} />
      <Route path={routeNames.AboutRoute} exact component={AboutPage} />
    </HashRouter>
  )
}

export default App
