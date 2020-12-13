import React, { ReactElement, useState } from 'react'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'
import { IoIosArrowDropdownCircle } from 'react-icons/io'

export const DPIAConclusionAndRecommendations = (): ReactElement => {
  const [isShowed, setIsShowed] = useState(false)

  return (
    <div className={styles.body}>
      <div>
        <GenericButton
          onClick={() => setIsShowed((prevState) => !prevState)}
          className={styles.collapsible}
        >
          <h3>Concluzii și recomandări</h3>
          <IoIosArrowDropdownCircle
            style={{
              fontSize: '40px',
              transform: isShowed ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </GenericButton>
        <div style={{ maxHeight: isShowed ? 'none' : '0' }} className={styles.content}>
          <p>
            D.P.I.A. reprezintă o modalitate utilă pentru operatorii de date de a implementa sisteme
            de prelucrare a datelor care respectă RGPD și pot fi obligatorii pentru anumite tipuri
            de operațiuni de prelucrare. Acestea sunt scalabile și pot lua forme diferite, dar
            R.G.P.D. stabilește cerințele de bază ale unei D.P.I.A. eficiente. Operatorii de date ar
            trebui să considere că realizarea unei D.P.I.A. reprezintă o activitate utilă și
            pozitivă care ajută la respectarea legislației. Ținând seama de natura, domeniul de
            aplicare, contextul și scopurile prelucrării, precum și de riscurile cu grade diferite
            de probabilitate și gravitate pentru drepturile și libertățile persoanelor fizice,
            opeartorul pune în aplicare măsuri tehnice și organizatorice adecvate pentru a garanta
            și a fi în măsură să demonstreze că prelucrarea se efectuează în conformitate cu
            prezentul Regulament. Respectivele măsuri se revizuiesc și se actualizează dacă este
            necesar. D.P.I.A. reprezintă o parte esențială a respectării Regulamentului atunci când
            este planificată sau are loc o prelucrare a datelor cu risc ridicat. Aceasta înseamnă că
            operatorii de date ar trebui să utilizeze criteriile stabilite în acest document pentru
            a stabili dacă trebuie sau nu să realizeze o D.P.I.A.. Politica internă a operatorului
            de date ar putea extinde această listă în afara cerințelor legale ale R.G.P.D.. Acest
            lucru ar trebui să ducă la o mai mare încredere a persoanelor vizate și a altor
            operatori de date.
          </p>
        </div>
      </div>
    </div>
  )
}
