import { Header } from '@/app/components/Header'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { CreateOrganisationPage } from '../pages/CreateOrganisationPage'
import { LoginPage } from '../pages/LoginPage'
import { OrganisationDepartmentsPage } from '../pages/OrganisationPage/OrganisationDepartmentsPage/OrganisationDepartmentsPage'
import { OrganisationEmployeePage } from '../pages/OrganisationPage/OrganisationEmployeePage/OrganisationEmployeePage'
import { OrganisationInfoPage } from '../pages/OrganisationPage/OrganisationInfoPage/OrganisationInfoPage'
import { OrganisationsPage } from '../pages/OrganisationsPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { RootPage } from '../pages/RootPage'
import { GlobalStateType } from '../store'
import { DecisionRoute } from './DecisionRoute'
import { routeNames } from './routeNames'

const AppRouterComponent = (): ReactElement => {
  const isAuthenticated = useSelector(
    (state: GlobalStateType) => state.authenticationReducer.isAuthenticated,
  )

  return (
    <HashRouter>
      <Header />
      <div style={{ marginTop: '50px' }}>
        <Switch>
          <DecisionRoute
            decisionFunc={() => isAuthenticated}
            path={routeNames.RootPageRoute}
            exact
            trueComponent={RootPage}
            falseComponent={LoginPage}
          />

          <DecisionRoute
            decisionFunc={() => isAuthenticated}
            path={routeNames.OrganisationsPageRoute}
            exact
            trueComponent={OrganisationsPage}
            falseComponent={LoginPage}
          />

          <DecisionRoute
            path={[routeNames.OrganisationPageRoute, routeNames.OrgansationInfoPageRoute]}
            exact
            decisionFunc={() => isAuthenticated}
            trueComponent={OrganisationInfoPage}
            falseComponent={LoginPage}
          />

          <DecisionRoute
            decisionFunc={() => isAuthenticated}
            path={routeNames.OrganisationDepartmentsPageRoute}
            exact
            trueComponent={OrganisationDepartmentsPage}
            falseComponent={LoginPage}
          />
          <DecisionRoute
            decisionFunc={() => isAuthenticated}
            path={routeNames.OrganisationEmployeePageRoute}
            exact
            trueComponent={OrganisationEmployeePage}
            falseComponent={LoginPage}
          />

          <DecisionRoute
            decisionFunc={() => isAuthenticated}
            path={routeNames.CreateOrganisationPageRoute}
            exact
            trueComponent={CreateOrganisationPage}
            falseComponent={LoginPage}
          />

          <Route path={routeNames.RegistrationPageRoute} exact component={RegistrationPage} />
          <Route path={routeNames.LoginPageRoute} exact component={LoginPage} />
        </Switch>
      </div>
    </HashRouter>
  )
}

export const AppRouter = AppRouterComponent
