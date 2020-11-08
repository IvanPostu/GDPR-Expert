// import { DepartmentsTable } from './DepartmentsTable'
import React, { Component, PropsWithChildren, ReactElement } from 'react'
import { RouteChildrenProps } from 'react-router-dom'
import { OrganisationPageLayout } from '../OrganisationPageLayout'
import { GenericTableA } from '@/app/components/Tables'
import styles from './styles.module.scss'

type OrganisationDepartmentsPageComponentPropType = RouteChildrenProps & PropsWithChildren<unknown>

class OrganisationDepartmentsPageComponent extends Component<
  OrganisationDepartmentsPageComponentPropType
> {
  constructor(props: OrganisationDepartmentsPageComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    const isEmpty = false

    return (
      <OrganisationPageLayout {...this.props}>
        <div className={styles.container}>
          {isEmpty ? (
            <div className={styles.emptyDepartmentsMessage}>
              <p>Pentru organizația dată nu există departamente!</p>
            </div>
          ) : (
            <GenericTableA
              headerCells={['Denumire', 'Respinsabil', 'Telefon', 'Email']}
              cells={[
                [
                  'Resurse umaneResurse umaneResurse umaneResurse umaneResurse umane',
                  'Vasile Mardari',
                  '069 222 333 444 555',
                  'adjfadjfja dfjdao  dfjdao  dfjdao  dfjdao jfdaf@mail.ru',
                ],
              ]}
            />
          )}
        </div>
      </OrganisationPageLayout>
    )
  }
}

export const OrganisationDepartmentsPage = OrganisationDepartmentsPageComponent
