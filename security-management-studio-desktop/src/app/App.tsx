import React, { FC, PropsWithChildren, ReactElement, Fragment } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import { OrganisationsPage } from '@/app/pages/OrganisationsPage'
import { LoginPage } from '@/app/pages/LoginPage'
import { RegistrationPage } from '@/app/pages/RegistrationPage'
import { RootPage } from '@/app/pages/RootPage'

import { WindowTopBar } from '@/app/components/WindowTopBar'
import { Header } from '@/app/components/Header'
import { routeNames } from '@/app/routes/routeNames'
import { ReduxWrapper } from '@/app/store/root'

const App: FC<PropsWithChildren<unknown>> = (): ReactElement => {
  return (
    <Fragment>
      <WindowTopBar />
      <ReduxWrapper>
        <HashRouter>
          <Header />
          <div style={{ marginTop: '50px', height: '1500px' }}>
            <Route path={routeNames.RootPageRoute} exact component={RootPage} />

            <Route path={routeNames.OrganisationsPageRoute} exact component={OrganisationsPage} />
            <Route path={routeNames.LoginPageRoute} exact component={LoginPage} />
            <Route path={routeNames.RegistrationPageRoute} exact component={RegistrationPage} />
          </div>
        </HashRouter>
      </ReduxWrapper>
    </Fragment>
  )
}

export default App
