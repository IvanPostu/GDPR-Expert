import { Header } from '@/app/components/Header'
import React, { ReactElement } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { CreateOrganisationPage } from '../pages/CreateOrganisationPage'
import { LoginPage } from '../pages/LoginPage'
import { OrganisationDepartmentsPage } from '../pages/OrganisationPage/OrganisationDepartmentsPage/OrganisationDepartmentsPage'
import { OrganisationEmployeePage } from '../pages/OrganisationPage/OrganisationEmployeePage/OrganisationEmployeePage'
import { OrganisationInfoPage } from '../pages/OrganisationPage/OrganisationInfoPage/OrganisationInfoPage'
import { OrganisationsPage } from '../pages/OrganisationsPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { RootPage } from '../pages/RootPage'
import { routeNames } from './routeNames'

const AppRouterComponent = (): ReactElement => {
  return (
    <HashRouter>
      <Header />
      <div style={{ marginTop: '50px' }}>
        <Route path={routeNames.RootPageRoute} exact component={RootPage} />

        <Route path={routeNames.OrganisationsPageRoute} exact component={OrganisationsPage} />

        <Route
          path={[routeNames.OrganisationPageRoute, routeNames.OrgansationInfoPageRoute]}
          exact
          component={OrganisationInfoPage}
        />
        <Route
          path={routeNames.OrganisationDepartmentsPageRoute}
          exact
          component={OrganisationDepartmentsPage}
        />
        <Route
          path={routeNames.OrganisationEmployeePageRoute}
          exact
          component={OrganisationEmployeePage}
        />

        <Route
          path={routeNames.CreateOrganisationPageRoute}
          exact
          component={CreateOrganisationPage}
        />
        <Route path={routeNames.RegistrationPageRoute} exact component={RegistrationPage} />
        <Route path={routeNames.LoginPageRoute} exact component={LoginPage} />
      </div>
    </HashRouter>
  )
}

export const AppRouter = AppRouterComponent
