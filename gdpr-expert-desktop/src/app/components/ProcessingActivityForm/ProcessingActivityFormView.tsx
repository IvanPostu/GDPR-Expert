import React, { ReactElement, SyntheticEvent, useCallback, useRef } from 'react'
import { Container } from '../Container'
import { FormCardA } from '../Form/FormCardA'
import { QuestionA } from '../Form/QuestionA'
import { SelectA } from '../Form/SelectA'
import { TextAreaA, TextInputA } from '../Form/TextInputA'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'
import { ProcessingPersonalDataActivity } from './types'

type ProcessingActivityFormViewPropType = {
  type: 'update' | 'create'
  departments: Array<{ name: string; id: number }>
  activity: ProcessingPersonalDataActivity
  setActivityData: (newActivity: ProcessingPersonalDataActivity) => void
  onSubmit: (e: SyntheticEvent) => void
}

export function ProcessingActivityFormView(
  props: ProcessingActivityFormViewPropType,
): ReactElement {
  const title =
    (props.type === 'create' ? 'Crearea ' : 'Modificarea ') +
    'unei activități de prelucrare a datelor cu caracter personal'

  const departmentsName = useRef<Array<string>>(props.departments.map((a) => a.name))
  useCallback(() => {
    departmentsName.current = props.departments.map((a) => a.name)
  }, [props.departments])

  return (
    <Container className={styles.container}>
      <FormCardA onSubmit={props.onSubmit} style={{ minWidth: '650px' }}>
        <h5 className={styles.title}>{title}</h5>

        <TextInputA
          onChange={(e) =>
            props.setActivityData({ ...props.activity, activityName: e.target.value })
          }
          value={props.activity.activityName}
          labelname="Denumire activității de procesare:"
          type="text"
        />

        <SelectA
          title={'Selectați departamentul:'}
          items={departmentsName.current}
          setSelectedItemIndex={(index) =>
            props.setActivityData({ ...props.activity, departmentId: props.departments[index].id })
          }
        />

        <TextInputA
          onChange={(e) => props.setActivityData({ ...props.activity, purposes: e.target.value })}
          value={props.activity.purposes}
          labelname="Scopul procesării:"
          type="text"
        />

        <QuestionA
          question="Datele procesate fac parte din categoria datelor sensibile?"
          answers={['Da', 'Nu']}
          selectAnswer={(answerIndex) =>
            props.setActivityData({ ...props.activity, dataIsSensible: answerIndex === 0 })
          }
          selectedAnswerIndex={0}
        />

        <TextInputA
          onChange={(e) =>
            props.setActivityData({ ...props.activity, activityOwner: e.target.value })
          }
          value={props.activity.activityOwner}
          labelname="Persoana ce realizează procesarea datelor curente:"
          type="text"
        />

        <TextAreaA
          value={props.activity.description}
          labelname="Descriere activității de prelucrare a datelor: "
          onChange={(e) =>
            props.setActivityData({ ...props.activity, description: e.target.value })
          }
        />

        <TextInputA
          onChange={(e) => {
            const newDate = e.target.value
            if (newDate > props.activity.endOfTheActivity) {
              alert(
                'Data de inițiere trebuie să aibă loc mai devreme decît data de finalizare a procesului de prelucrare a datelor!!!',
              )
              return
            }
            props.setActivityData({ ...props.activity, beginningOfTheActivity: newDate })
          }}
          value={props.activity.beginningOfTheActivity}
          labelname="Data de inițiere a procesului de prelucrare a datelor:"
          type="date"
        />

        <TextInputA
          onChange={(e) => {
            const newDate = e.target.value
            if (newDate < props.activity.beginningOfTheActivity) {
              alert(
                'Data de inițiere trebuie să aibă loc mai devreme decît data de finalizare a procesului de prelucrare a datelor!!!',
              )
              return
            }
            props.setActivityData({ ...props.activity, endOfTheActivity: newDate })
          }}
          value={props.activity.endOfTheActivity}
          labelname="Data de finalizare a procesului de prelucrare a datelor:"
          type="date"
        />

        <GenericButton type="submit" className={styles.submitButton}>
          Salvează
        </GenericButton>
      </FormCardA>
    </Container>
  )
}
