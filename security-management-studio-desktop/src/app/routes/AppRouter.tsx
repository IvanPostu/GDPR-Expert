import React, { ReactElement, Fragment } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { OrganisationsPage } from '@/app/pages/OrganisationsPage'
import { LoginPage } from '@/app/pages/LoginPage'
import { RegistrationPage } from '@/app/pages/RegistrationPage'
import { RootPage } from '@/app/pages/RootPage'
import { Header } from '@/app/components/Header'
import { routeNames } from '@/app/routes/routeNames'
import { CreateOrganisationPage } from '@/app/pages/CreateOrganisationPage'
import { GlobalStateType } from '../store'
import { connect } from 'react-redux'

function mapStateToProps(state: GlobalStateType) {
  return {
    isAuthenticated: state.authenticationReducer.isAuthenticated,
  }
}

type AppRouterComponentPropType = ReturnType<typeof mapStateToProps>

const AppRouterComponent = (props: AppRouterComponentPropType): ReactElement => {
  const isAuth = props.isAuthenticated

  const routes = isAuth ? (
    <Fragment>
      <Route path={routeNames.RootPageRoute} exact component={RootPage} />

      <Route path={routeNames.OrganisationsPageRoute} exact component={OrganisationsPage} />
      <Route
        path={routeNames.CreateOrganisationPageRoute}
        exact
        component={CreateOrganisationPage}
      />
      <Route path={routeNames.LoginPageRoute} exact component={LoginPage} />
      <Route path={routeNames.RegistrationPageRoute} exact component={RegistrationPage} />
    </Fragment>
  ) : (
    <Route path={'*'} component={LoginPage} />
  )

  return (
    <HashRouter>
      <Header />
      <div style={{ marginTop: '50px' }}>{routes}</div>
    </HashRouter>
  )
}

export const AppRouter = connect(mapStateToProps)(AppRouterComponent)
