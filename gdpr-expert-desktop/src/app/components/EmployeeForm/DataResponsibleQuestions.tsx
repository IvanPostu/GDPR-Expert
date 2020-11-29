import React, { ReactElement, useState } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { FormCardA } from '../Form/FormCardA'
import { QuestionA } from '../Form/QuestionA'

type DataResponsibleQuestionsPropType = {
  setPersonalDataResponsible: (responisble: boolean) => void
}

export const DataResponsibleQuestions = (props: DataResponsibleQuestionsPropType): ReactElement => {
  const [responses, setResponses] = useState<{
    isPublic: boolean
    procesData: boolean
    causesConsequences: boolean
    dataIsVulnerable: boolean
    dataAreRelatedToPersons: boolean
  }>({
    isPublic: true,
    procesData: true,
    dataIsVulnerable: true,
    causesConsequences: true,
    dataAreRelatedToPersons: true,
  })

  const submit = () => {
    let responsible = false

    if (responses.procesData && responses.causesConsequences && responses.dataAreRelatedToPersons) {
      responsible = true
    }

    props.setPersonalDataResponsible(responsible)
  }

  return (
    <FormCardA>
      <h2>Chestionar: </h2>
      <p style={{ margin: '10px' }}>
        <b>
          În urma îndeplinirii chestionarului dat se v-a decide dacă persoana este responsabilă de
          date cu caracter personal.
        </b>
      </p>
      {/* <QuestionA
        question="Departamentul din care face parte angajatul prestează servicii publice sau activează ca organism public?"
        answers={['Da', 'Nu']}
        setSelectedItem={(str) => {
          setResponses({
            ...responses,
            isPublic: str === 'Da',
          })
        }}
      />
      <QuestionA
        question="Activitatea angajatului dat are tangențe cu procesare datelor?"
        answers={['Da', 'Nu']}
        setSelectedItem={(str) =>
          setResponses({
            ...responses,
            procesData: str === 'Da',
          })
        }
      />
      <QuestionA
        question="Datele procesate de angajat în caz de scurgere de informație pot provoca urmări?"
        answers={['Da', 'Nu']}
        setSelectedItem={(str) =>
          setResponses({
            ...responses,
            causesConsequences: str === 'Da',
          })
        }
      />
      <QuestionA
        question="Datele procesate de angajat fac parte din categoria datelor sensibile?"
        answers={['Da', 'Nu']}
        setSelectedItem={(str) =>
          setResponses({
            ...responses,
            dataIsVulnerable: str === 'Da',
          })
        }
      />
      <QuestionA
        question="Angajatul procesează date despre activitatea sau starea persoanelor fizece sau juridice?"
        answers={['Da', 'Nu']}
        setSelectedItem={(str) =>
          setResponses({
            ...responses,
            dataAreRelatedToPersons: str === 'Da',
          })
        }
      /> */}
      <ButtonA type="button" title="Salvează" onClick={submit} />
    </FormCardA>
  )
}
