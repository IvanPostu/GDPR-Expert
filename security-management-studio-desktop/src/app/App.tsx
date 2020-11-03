import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import { HomePage } from '@/app/pages/HomePage'
import { AboutPage } from '@/app/pages/AboutPage'
import { LoginPage } from '@/app/pages/LoginPage'
import { RegistrationPage } from '@/app/pages/RegistrationPage'
import { RootPage } from '@/app/pages/RootPage'

import { WindowTopBar } from '@/app/components/WindowTopBar'
import { Header } from '@/app/components/Header'
import { routeNames } from '@/app/routes/routeNames'
import { ReduxWrapper } from '@/app/store/root'

const App: FC<PropsWithChildren<unknown>> = (): ReactElement => {
  return (
    <ReduxWrapper>
      <HashRouter>
        <WindowTopBar />
        <Header />
        {/* <Link to={routeNames.HomeRoute}>Home</Link>
        <Link to={routeNames.AboutRoute}>About</Link> */}

        <Route path={routeNames.RootPageRoute} exact component={RootPage} />

        <Route path={[routeNames.HomeRoute]} exact component={HomePage} />
        <Route path={routeNames.AboutRoute} exact component={AboutPage} />
        <Route path={routeNames.LoginPageRoute} exact component={LoginPage} />
        <Route path={routeNames.RegistrationPageRoute} exact component={RegistrationPage} />
      </HashRouter>
    </ReduxWrapper>
  )
}

export default App
