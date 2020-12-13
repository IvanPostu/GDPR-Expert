import React, { ReactElement, useState } from 'react'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'
import { IoIosArrowDropdownCircle } from 'react-icons/io'

export const DPIACriteriaIfAnalyzeIsNeeded = (): ReactElement => {
  const [state, setState] = useState({
    criteriesIfAnalyzeIsNeeded: false,
  })

  return (
    <div className={styles.body}>
      <div>
        <GenericButton
          onClick={() =>
            setState((prevState) => ({
              ...prevState,
              criteriesIfAnalyzeIsNeeded: !prevState.criteriesIfAnalyzeIsNeeded,
            }))
          }
          className={styles.collapsible}
        >
          <h3>Criterii pentru a analiza dacă activitatea de prelucrare necesită E.I.P.D. </h3>
          <IoIosArrowDropdownCircle
            style={{
              fontSize: '40px',
              transform: state.criteriesIfAnalyzeIsNeeded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </GenericButton>
        <div
          style={{ maxHeight: state.criteriesIfAnalyzeIsNeeded ? 'none' : '0' }}
          className={styles.content}
        >
          <table>
            <thead>
              <tr>
                <th>Exemple de prelucrare</th>
                <th>Posibile criterii relevante</th>
                <th>Este posibil ca DPIA să fie necesară?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Un spital prelucrează datele genetice și datele de sănătate ale pacienților săi și
                  (sistemul de informații al spitalului).
                </td>
                <td>
                  <p>- Date sensibile sau date de natură foarte personală.</p>
                  <p>- Date privind persoanele fizice vulnerabile.</p>
                  <p>- Date prelucrate pe scară largă. </p>
                </td>
                <td>DA</td>
              </tr>
              <tr>
                <td>
                  O companie monitorizează în mod sistematic activitatea propriilor angajați,
                  inclusiv monitorizarea stațiilor de lucru ale angajaților și activitatea pe
                  Internet etc.
                </td>
                <td>
                  <p>- Monitorizare sistematică. </p>
                  <p>- Date privind persoanele vizate vulnerabile </p>
                </td>
                <td>DA</td>
              </tr>
              <tr>
                <td>Colectarea de date de social media publice pentru generarea de profiluri</td>
                <td>
                  <p>- Evaluare sau scoring. </p>
                  <p>- Date prelucrate pe scară largă. </p>
                  <p>- Potrivirea sau combinarea seturilorde date. </p>
                  <p>- Date sensibile sau date de natură foarte personală. </p>
                </td>
                <td>DA</td>
              </tr>

              <tr>
                <td>
                  O instituție care creează o bază de date la nivel național privind creditele sau
                  privind frauda.
                </td>
                <td>
                  <p>- Evaluare sau scoring. </p>
                  <p>- Decizie automată care produce efecte juridice sau similare semnificative.</p>
                  <p>
                    - Împiedică persoana vizată să-și exercite un drept sau să utilizeze unserviciu
                    sau un contract.
                  </p>
                  <p>- Date sensibile sau date de naturăfoarte personală. </p>
                </td>
                <td>DA</td>
              </tr>

              <tr>
                <td>
                  Stocarea în scop de arhivare a datelor personale sensibile pseudonimizate privind
                  persoanele vizate vulnerabile din proiectele de cercetare sau studii clinice.
                </td>
                <td>
                  <p>- Date sensibile. </p>
                  <p>- Date privind persoanele vizatevulnerabile.</p>
                  <p>
                    - Împiedică persoana vizată să-și exercite un drept sau să utilizeze unserviciu
                    sau un contract.
                  </p>
                </td>
                <td>DA</td>
              </tr>

              <tr>
                <td>
                  Prelucrarea „datelor personale de la pacienți sau clienți de către un anumit
                  medic, un alt profesionist în domeniul sănătății sau un avocat”
                </td>
                <td>
                  <p>- Date sensibile sau date de natură foarte personală. </p>
                  <p>- Date privind persoanele vizate vulnerabile.</p>
                </td>
                <td>NU</td>
              </tr>

              <tr>
                <td>
                  O revistă online care folosește o listă de corespondență pentru a trimite un
                  abonament generic zilnic abonanților săi.
                </td>
                <td>
                  <p>- Date prelucrare pe scară largă.</p>
                </td>
                <td>NU</td>
              </tr>

              <tr>
                <td>
                  Un site web de comer electronic carețafi ează anun uri pentru piese deșțma ini de
                  epocă care implică profilurișlimitate bazate pe elemente vizionatesau achizi
                  ionate pe site-ul propriu.
                </td>
                <td>
                  <p>- Evaluare sau scoring.</p>
                </td>
                <td>NU</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
