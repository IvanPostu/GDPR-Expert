import React, { ReactElement } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { FormCardA } from '../Form/FormCardA'
import { QuestionA } from '../Form/QuestionA'

export const DataResponsibleQuestions = (): ReactElement => {
  return (
    <FormCardA cardBackgroundColor="rgba(255, 255, 255, 0.97)" onSubmit={() => {}}>
      <h2>Chestionar: </h2>
      <p style={{ margin: '10px' }}>
        <b>
          În urma îndeplinirii chestionarului dat se v-a decide dacă persoana este responsabilă de
          date cu caracter personal.
        </b>
      </p>
      <QuestionA
        question="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam temporibus ad dicta magni!?"
        items={['Da', 'Nu']}
        setSelectedItem={(str) => console.log(str)}
      />
      <QuestionA
        question="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam temporibus ad dicta magni!?"
        items={['Da', 'Nu']}
        setSelectedItem={(str) => console.log(str)}
      />
      <QuestionA
        question="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam temporibus ad dicta magni!?"
        items={['Da', 'Nu']}
        setSelectedItem={(str) => console.log(str)}
      />
      <ButtonA type="button" title="Salvează" />
    </FormCardA>
  )
}
