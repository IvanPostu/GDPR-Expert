import { SuccessButton } from '@/app/components/Button/SuccessButton'
import { Container } from '@/app/components/Container'
import { routeNames } from '@/app/routes/routeNames'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { connect } from 'react-redux'
import { NavLink, RouteChildrenProps } from 'react-router-dom'
import styles from './styles.module.scss'

function mapStateToProps() {
  return {
    currentOrganisationName: 'Abc org name',
  }
}

type OrganisationPageLayoutPropType = RouteChildrenProps &
  PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps>

export class OrganisationPageLayoutComponent extends Component<OrganisationPageLayoutPropType> {
  constructor(props: OrganisationPageLayoutPropType) {
    super(props)
  }

  render(): ReactElement {
    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.panel}>
            <div>
              <NavLink to={routeNames.OrgansationInfoPageRoute}>
                <SuccessButton title="Informație de bază" />
              </NavLink>
              <NavLink to={routeNames.OrganisationDepartmentsPageRoute}>
                <SuccessButton title="Departamente" />
              </NavLink>
              <NavLink to={routeNames.OrganisationEmployeePageRoute}>
                <SuccessButton title="Angajanți" />
              </NavLink>
            </div>
            <div>
              <h1>{this.props.currentOrganisationName}</h1>
            </div>
          </div>
          {this.props.children}
        </div>
      </Container>
    )
  }
}

export const OrganisationPageLayout = connect(mapStateToProps)(OrganisationPageLayoutComponent)
