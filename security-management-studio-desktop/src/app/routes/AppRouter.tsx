import { Header } from '@/app/components/Header'
import React, { ReactElement } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { CreateDepartmentPage } from '../pages/CreateDepartmentPage'
import { CreateOrganisationPage } from '../pages/CreateOrganisationPage'
import { LoginPage } from '../pages/LoginPage'
import { OrganisationDepartmentsPage } from '../pages/OrganisationPage/OrganisationDepartmentsPage/OrganisationDepartmentsPage'
import { OrganisationEmployeePage } from '../pages/OrganisationPage/OrganisationEmployeePage/OrganisationEmployeePage'
import { OrganisationInfoPage } from '../pages/OrganisationPage/OrganisationInfoPage/OrganisationInfoPage'
import { OrganisationsPage } from '../pages/OrganisationsPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { RootPage } from '../pages/RootPage'
import { ProtectedRoute } from './ProtectedRoute'
import { routeNames } from './routeNames'

const AppRouterComponent = (): ReactElement => {
  return (
    <HashRouter>
      <Header />
      <div style={{ marginTop: '50px' }}>
        <Switch>
          <Route path={routeNames.RegistrationPageRoute} exact component={RegistrationPage} />
          <Route path={routeNames.LoginPageRoute} exact component={LoginPage} />
          <ProtectedRoute component={RootPage} exact path={routeNames.RootPageRoute} />
          <ProtectedRoute
            component={OrganisationsPage}
            exact
            path={routeNames.OrganisationsPageRoute}
          />
          <ProtectedRoute
            component={OrganisationInfoPage}
            exact
            path={[routeNames.OrganisationPageRoute, routeNames.OrgansationInfoPageRoute]}
          />

          <ProtectedRoute
            component={OrganisationDepartmentsPage}
            exact
            path={routeNames.OrganisationDepartmentsPageRoute}
          />
          <ProtectedRoute
            component={OrganisationEmployeePage}
            exact
            path={routeNames.OrganisationEmployeePageRoute}
          />
          <ProtectedRoute
            component={CreateOrganisationPage}
            exact
            path={routeNames.CreateOrganisationPageRoute}
          />
          <ProtectedRoute
            component={CreateDepartmentPage}
            exact
            path={routeNames.CreateDepartmentPageRoute}
          />
        </Switch>
      </div>
    </HashRouter>
  )
}

export const AppRouter = AppRouterComponent
