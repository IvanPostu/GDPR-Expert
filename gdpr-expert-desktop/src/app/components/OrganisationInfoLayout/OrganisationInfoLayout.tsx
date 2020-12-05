import { Container } from '@/app/components/Container'
import { GenericButton } from '@/app/components/GenericButton'
import { routeNames } from '@/app/routes/routeNames'
import { GlobalStateType } from '@/app/store'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { connect } from 'react-redux'
import { NavLink, RouteChildrenProps } from 'react-router-dom'
import styles from './styles.module.scss'

function mapStateToProps(globalState: GlobalStateType) {
  return {
    currentOrganisationName: globalState.organisationInfoReducer.organisation.organisationName,
  }
}

type OrganisationInfoLayoutPropType = RouteChildrenProps &
  PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps>

export class OrganisationInfoLayoutComponent extends Component<OrganisationInfoLayoutPropType> {
  constructor(props: OrganisationInfoLayoutPropType) {
    super(props)
  }

  render(): ReactElement {
    let organisationName = this.props.currentOrganisationName
    organisationName =
      organisationName.length > 45 ? organisationName.substr(0, 42) + ' ...' : organisationName
    return (
      <Container>
        <div className={styles.container}>
          <div className={styles.panel}>
            <div>
              <NavLink to={routeNames.OrgansationInfoPageRoute}>
                <GenericButton className={styles.btn}>Informație de bază</GenericButton>
              </NavLink>
              <NavLink to={routeNames.OrganisationDepartmentsPageRoute}>
                <GenericButton className={styles.btn}>Departamente</GenericButton>
              </NavLink>
              <NavLink to={routeNames.GDPRLastEvaluationInfoPageRoute}>
                <GenericButton className={styles.btn}>Evaluare R.G.D.P.</GenericButton>
              </NavLink>
              <NavLink to={routeNames.ProcessingActivitiesPageRoute}>
                <GenericButton className={styles.btn}>
                  Activități de procesare a D.C.P.
                </GenericButton>
              </NavLink>
            </div>
            <div>
              <h5>{organisationName}</h5>
            </div>
          </div>
          {this.props.children}
        </div>
      </Container>
    )
  }
}

export const OrganisationInfoLayout = connect(mapStateToProps)(OrganisationInfoLayoutComponent)
