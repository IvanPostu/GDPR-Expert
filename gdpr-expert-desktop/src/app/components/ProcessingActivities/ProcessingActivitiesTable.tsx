import React, { ReactElement } from 'react'
import { GenericTableA } from '../Tables'
import { ProcessingActivitiesTableItemsType } from './types'

type ProcessingActivitiesPropType = {
  activities: Array<ProcessingActivitiesTableItemsType>
  onUpdateClick: (id: string) => void
  onInfoClick: (id: string) => void
}

export function ProcessingActivitiesTable(props: ProcessingActivitiesPropType): ReactElement {
  if (props.activities.length > 0) {
    return (
      <GenericTableA
        onInfoClick={props.onInfoClick}
        onUpdateClick={props.onUpdateClick}
        headerCells={[
          'Denumirea activității de prelucrare',
          'Denumirea de departament',
          'Responsabil de prelucrare',
          'Persoana cărei aparțin datele',
          'Scopul prelucrării',
          'Statut',
        ]}
        cells={props.activities}
        headerWidths={[15, 15, 15, 15, 30, 10]}
      />
    )
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <h3>Organizația dată nu conține activități de prelucrare a datelor.</h3>
      </div>
    )
  }
}
