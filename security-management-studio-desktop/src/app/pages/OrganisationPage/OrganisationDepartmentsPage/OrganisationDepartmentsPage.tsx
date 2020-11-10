// import { DepartmentsTable } from './DepartmentsTable'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { NavLink, RouteChildrenProps } from 'react-router-dom'
import { OrganisationPageLayout } from '../OrganisationPageLayout'
import { GenericTableA } from '@/app/components/Tables'
import styles from './styles.module.scss'
import { InfoButton } from '@/app/components/Button/InfoButton'
import { routeNames } from '@/app/routes/routeNames'
import { BasicLoader } from '@/app/components/BasicLoader'
import { GlobalStateType } from '@/app/store'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { fetchDepartmentsActionCreator } from '@/app/store/Departments/actionCreators'

function mapStateToProps(globalState: GlobalStateType) {
  return {
    ...globalState.departmentsReducer,
    organisationId: globalState.organisationInfoReducer.organisation.organisationId,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { fetchDepartmentsActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type OrganisationDepartmentsPageComponentPropType = RouteChildrenProps &
  PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

function Loader(): ReactElement {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '25px' }}>
      <BasicLoader size="80px" />
    </div>
  )
}
class OrganisationDepartmentsPageComponent extends Component<
  OrganisationDepartmentsPageComponentPropType
> {
  constructor(props: OrganisationDepartmentsPageComponentPropType) {
    super(props)
  }

  componentDidMount(): void {
    this.props.fetchDepartmentsActionCreator(Number(this.props.organisationId))
  }

  render(): ReactElement {
    const isEmpty = false
    const isLoading = this.props.isLoadProcess
    const cells = this.props.departments.map((item) => ({
      id: String(item.departmentId),
      name: item.departmentName,
      admin: item.departmentResponsiblePerson,
      phone: item.departmentPhoneNumber,
      email: item.departmentEmail,
    }))

    const content = isEmpty ? (
      <div className={styles.emptyDepartmentsMessage}>
        <p>Pentru organizația dată nu există departamente!</p>
      </div>
    ) : (
      <GenericTableA
        onDeleteClick={(id) => console.log('delete: ', id)}
        onInfoClick={(id) => console.log('info: ', id)}
        onUpdateClick={(id) => console.log('update: ', id)}
        headerCells={['Denumire', 'Respinsabil', 'Telefon', 'Email']}
        cells={cells}
      />
    )

    const finalContent = isLoading ? <Loader /> : content

    return (
      <OrganisationPageLayout {...this.props}>
        <div className={styles.container}>
          <div className={styles.panel}>
            <NavLink to={routeNames.CreateDepartmentPageRoute}>
              <InfoButton className={styles.btn} title="Adaugă departament nou" />
            </NavLink>
          </div>
          {finalContent}
        </div>
      </OrganisationPageLayout>
    )
  }
}

export const OrganisationDepartmentsPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganisationDepartmentsPageComponent)
