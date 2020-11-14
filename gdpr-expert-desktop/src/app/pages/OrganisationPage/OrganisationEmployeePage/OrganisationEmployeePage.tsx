import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { OrganisationPageLayout } from '../OrganisationPageLayout'
import styles from './styles.module.scss'

type OrganisationEmployeePageComponentPropType = RouteChildrenProps & PropsWithChildren<unknown>

class OrganisationEmployeePageComponent extends Component<
  OrganisationEmployeePageComponentPropType
> {
  constructor(props: OrganisationEmployeePageComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    // const isEmpty = false

    return (
      <OrganisationPageLayout {...this.props}>
        <div className={styles.container}>
          {/* <div className={styles.panel}>
            <NavLink to={routeNames.CreateDepartmentPageRoute}>
              <InfoButton className={styles.btn} title="Adaugă angajant nou" />
            </NavLink>
          </div> */}
          {/* {isEmpty ? (
            <div className={styles.emptyEmployeeMessage}>
              <p>Organizația dată nu are angajanți!</p>
            </div>
          ) : (
            <GenericTableA
              headerCells={['Nume', 'Telefon', 'Email', 'Tip']}
              cells={[
                [
                  'Mircea Zamovski',
                  '+373 878 909 342 768',
                  'adkfjlkadjfldajlfjladlkfad@mail.ru',
                  'Responsabil de date cu caracter personal',
                ],
              ]}
            />
          )} */}
        </div>
      </OrganisationPageLayout>
    )
  }
}

export const OrganisationEmployeePage = OrganisationEmployeePageComponent
