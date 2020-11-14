import React, { ReactElement } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { FormCardA } from '../Form/FormCardA'
import { QuestionA } from '../Form/QuestionA'

export const DataResponsibleQuestions = (): ReactElement => {
  return (
    <FormCardA>
      <h2>Chestionar: </h2>
      <p style={{ margin: '10px' }}>
        <b>
          În urma îndeplinirii chestionarului dat se v-a decide dacă persoana este responsabilă de
          date cu caracter personal.
        </b>
      </p>
      <QuestionA
        question="Departamentul din care face parte angajatul prestează servicii publice sau activează ca organism public?"
        items={['Da', 'Nu']}
        setSelectedItem={(str) => console.log(str)}
      />
      <QuestionA
        question="Activitatea angajatului dat are tangențe cu procesare datelor?"
        items={['Da', 'Nu']}
        setSelectedItem={(str) => console.log(str)}
      />
      <QuestionA
        question="Datele procesate de angajant în caz de scurgere de informație pot provoca urmări?"
        items={['Da', 'Nu']}
        setSelectedItem={(str) => console.log(str)}
      />
      <QuestionA
        question="Datele procesate de angajat fac parte din categoria datelor sensibile?"
        items={['Da', 'Nu']}
        setSelectedItem={(str) => console.log(str)}
      />
      <QuestionA
        question="Angajatul procesează date despre activitatea sau starea persoanelor fizece sau juridice?"
        items={['Da', 'Nu']}
        setSelectedItem={(str) => console.log(str)}
      />
      <ButtonA type="button" title="Salvează" />
    </FormCardA>
  )
}
