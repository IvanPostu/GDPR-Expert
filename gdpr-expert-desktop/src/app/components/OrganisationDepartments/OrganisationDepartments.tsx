import React, { Component, ReactElement } from 'react'
import { NavLink, RouteChildrenProps } from 'react-router-dom'
import { GenericTableA } from '@/app/components/Tables'
import styles from './styles.module.scss'
import { InfoButton } from '@/app/components/Button/InfoButton'
import { routeNames } from '@/app/routes/routeNames'
import { BasicLoader } from '@/app/components/BasicLoader'
import { GlobalStateType } from '@/app/store'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { fetchDepartmentsActionCreator } from '@/app/store/Departments/actionCreators'
import { RouteComponentProps } from 'react-router'
import { deleteDepartment } from '@/app/webApi/department/deleteDepartment'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import { OrganisationInfoLayout } from '@/app/components/OrganisationInfoLayout'

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

type OrganisationDepartmentsComponentPropType = RouteChildrenProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps

type OrganisationDepartmentsComponentStateType = {
  isLoading: boolean
}
function Loader(): ReactElement {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '25px' }}>
      <BasicLoader size="80px" />
    </div>
  )
}
class OrganisationDepartmentsComponent extends Component<
  OrganisationDepartmentsComponentPropType,
  OrganisationDepartmentsComponentStateType
> {
  constructor(props: OrganisationDepartmentsComponentPropType) {
    super(props)
    this.state = { isLoading: false }
    this.redirect = this.redirect.bind(this)
    this.deleteDepartment = this.deleteDepartment.bind(this)
  }

  componentDidMount(): void {
    this.props.fetchDepartmentsActionCreator(Number(this.props.organisationId))
  }

  redirect(type: 'info' | 'update', departmentId: number) {
    if (type === 'info') {
      this.props.history.push({
        pathname: routeNames.DepartmentPage,
        search: `?departmentId=${departmentId}`,
      })
    }

    if (type === 'update') {
      this.props.history.push({
        pathname: routeNames.UpdateDepartmentPageRoute,
        search: `?departmentId=${departmentId}`,
      })
    }
  }

  deleteDepartment(departmentId: number) {
    const deleteDepartmentCond = confirm('Precis doriți să ștergeți departamentul dat?')
    if (deleteDepartmentCond) {
      this.setState({ isLoading: true })
      deleteDepartment(departmentId).then((res) => {
        if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
          this.props.fetchDepartmentsActionCreator(Number(this.props.organisationId))
        }
        this.setState({ isLoading: false })
      })
    }
  }

  render(): ReactElement {
    const isEmpty = this.props.departments.length === 0
    const isLoading = this.props.isLoadProcess || this.state.isLoading
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
        onDeleteClick={(id) => this.deleteDepartment(Number(id))}
        onInfoClick={(id) => this.redirect('info', Number(id))}
        onUpdateClick={(id) => this.redirect('update', Number(id))}
        headerCells={['Denumire', 'Responsabil', 'Telefon', 'Email']}
        cells={cells}
      />
    )

    const finalContent = isLoading ? <Loader /> : content

    return (
      <OrganisationInfoLayout {...this.props}>
        <div className={styles.container}>
          <div className={styles.panel}>
            <NavLink to={routeNames.CreateDepartmentPageRoute}>
              <InfoButton className={styles.btn} title="Adaugă departament nou" />
            </NavLink>
          </div>
          {finalContent}
        </div>
      </OrganisationInfoLayout>
    )
  }
}

export const OrganisationDepartments = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganisationDepartmentsComponent)
