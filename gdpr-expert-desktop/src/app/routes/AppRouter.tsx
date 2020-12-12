import { Header } from '@/app/components/Header'
import React, { ReactElement } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { WindowTopBar } from '../components/WindowTopBar'
import { CreateDepartmentPage } from '../pages/CreateDepartmentPage'
import { CreateEmployeePage } from '../pages/CreateEmployeePage'
import { CreateOrganisationPage } from '../pages/CreateOrganisationPage'
import { CreateProcessingActivityPage } from '../pages/CreateProcessingActivityPage/CreateProcessingActivityPage'
import { DataProcessingActivityInfoPage } from '../pages/DataProcessingActivityInfoPage/DataProcessingActivityInfoPage'
import { DepartmentPage } from '../pages/DepartamentPage'
import { EmployeeAddDocumentsPage } from '../pages/EmployeeAddDocumentsPage/EmployeeAddDocumentsPage'
import { EmployeeDocumentsPage } from '../pages/EmployeeDocumentsPage/EmployeeDocumentsPage'
import EmployeeInfoPage from '../pages/EmployeeInfoPage/EmployeeInfoPage'
import { GDPREvaluationPage } from '../pages/GDPREvaluationPage/GDPREvaluationPage/GDPREvaluationPage'
import { GDPRLastEvaluationInfoPage } from '../pages/GDPREvaluationPage/GDPRLastEvaluationInfoPage/GDPRLastEvaluationInfoPage'
import { LoginPage } from '../pages/LoginPage'
import { OrganisationDepartmentsPage } from '../pages/OrganisationPage/OrganisationDepartmentsPage/OrganisationDepartmentsPage'
import { OrganisationInfoPage } from '../pages/OrganisationPage/OrganisationInfoPage/OrganisationInfoPage'
import { OrganisationsPage } from '../pages/OrganisationsPage'
import { OrganisationUpdatePage } from '../pages/OrganisationUpdatePage'
import { ProcessingActivitiesPage } from '../pages/ProcessingActivitiesPage/ProcessingActivitiesPage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { RequestsForPersonalInfoDetailsPage } from '../pages/RequestsForPersonalInfoDetailsPage/RequestsForPersonalInfoDetailsPage'
import { RequestsForPersonalInfoPage } from '../pages/RequestsForPersonalInfoPage/RequestsForPersonalInfoPage'
import { RootPage } from '../pages/RootPage'
import SeverityEvaluationOfPersonalDataPage from '../pages/SeverityEvaluationOfPersonalDataPage/SeverityEvaluationOfPersonalDataPage'
import { SeverityEvaluationOfPersonalDataResultPage } from '../pages/SeverityEvaluationOfPersonalDataResultPage/SeverityEvaluationOfPersonalDataResultPage'
import { UpdateDepartmentPage } from '../pages/UpdateDepartmentPage'
import { UpdateEmployeePage } from '../pages/UpdateEmployeePage/UpdateEmployeePage'
import { ProtectedRoute } from './ProtectedRoute'
import { routeNames } from './routeNames'

const AppRouterComponent = (): ReactElement => {
  return (
    <HashRouter>
      <WindowTopBar />

      <Header />
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
          component={CreateOrganisationPage}
          exact
          path={routeNames.CreateOrganisationPageRoute}
        />

        <ProtectedRoute component={DepartmentPage} exact path={routeNames.DepartmentPage} />

        <ProtectedRoute
          component={CreateDepartmentPage}
          exact
          path={routeNames.CreateDepartmentPageRoute}
        />

        <ProtectedRoute
          component={UpdateDepartmentPage}
          exact
          path={routeNames.UpdateDepartmentPageRoute}
        />

        <ProtectedRoute
          component={CreateEmployeePage}
          exact
          path={routeNames.CreateEmployeePageRoute}
        />

        <ProtectedRoute
          component={UpdateEmployeePage}
          exact
          path={routeNames.UpdateEmployeePageRoute}
        />

        <ProtectedRoute
          component={EmployeeInfoPage}
          exact
          path={routeNames.EmployeeInfoPageRoute}
        />

        <ProtectedRoute
          component={EmployeeDocumentsPage}
          exact
          path={routeNames.EmployeeDocumentsPageRoute}
        />

        <ProtectedRoute
          component={EmployeeAddDocumentsPage}
          exact
          path={routeNames.EmployeeAddDocumentsPageRoute}
        />

        <ProtectedRoute
          component={OrganisationUpdatePage}
          exact
          path={routeNames.OrganisationUpdatePage}
        />

        <ProtectedRoute
          component={GDPREvaluationPage}
          exact
          path={routeNames.GDPREvaluationPageRoute}
        />

        <ProtectedRoute
          component={GDPRLastEvaluationInfoPage}
          exact
          path={routeNames.GDPRLastEvaluationInfoPageRoute}
        />

        <ProtectedRoute
          component={ProcessingActivitiesPage}
          exact
          path={routeNames.ProcessingActivitiesPageRoute}
        />

        <ProtectedRoute
          component={CreateProcessingActivityPage}
          exact
          path={routeNames.CreateProcessingActivityPageRoute}
        />

        <ProtectedRoute
          component={DataProcessingActivityInfoPage}
          exact
          path={routeNames.DataProcessingActivityInfoPageRoute}
        />

        <ProtectedRoute
          component={RequestsForPersonalInfoPage}
          exact
          path={routeNames.RequestsForPersonalInfoPageRoute}
        />

        <ProtectedRoute
          component={RequestsForPersonalInfoDetailsPage}
          exact
          path={routeNames.RequestsForPersonalInfoDetailsPageRoute}
        />

        <ProtectedRoute
          component={SeverityEvaluationOfPersonalDataPage}
          exact
          path={routeNames.SeverityEvaluationOfPersonalDataPageRoute}
        />

        <ProtectedRoute
          component={SeverityEvaluationOfPersonalDataResultPage}
          exact
          path={routeNames.SeverityEvaluationOfPersonalDataResultPageRoute}
        />
        <ProtectedRoute
          component={SeverityEvaluationOfPersonalDataResultPage}
          exact
          path={routeNames.SeverityEvaluationOfPersonalDataResultPageRoute}
        />
      </Switch>
    </HashRouter>
  )
}

export const AppRouter = AppRouterComponent
