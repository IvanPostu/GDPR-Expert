import React, { ReactElement, useState } from 'react'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'
import { IoIosArrowDropdownCircle } from 'react-icons/io'

export default function DPIAGeneralItem(): ReactElement {
  const [state, setState] = useState({
    generalIsShowed: false,
  })

  return (
    <div className={styles.body}>
      <div>
        <GenericButton
          onClick={() =>
            setState((prevState) => ({
              ...prevState,
              generalIsShowed: !prevState.generalIsShowed,
            }))
          }
          className={styles.collapsible}
        >
          <h3>General </h3>
          <IoIosArrowDropdownCircle
            style={{
              fontSize: '40px',
              transform: state.generalIsShowed ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </GenericButton>
        <div style={{ maxHeight: state.generalIsShowed ? 'none' : '0' }} className={styles.content}>
          <p>
            EIPD este de fapt întruchiparea unui mix de aspecte juridice, de evaluare, tehnice și de
            comunicare. În plus, include atât procedura de control, cât și cea de procesare de date
            și asigură responsabilitatea unei companii. Există o obligație legală de a efectua o
            evaluare în cazul în care prelucrarea poate duce la un risc ridicat pentru persoana
            vizată (articolul 35 din RGPD). Având în vedere miza într-o afacere și evoluția
            sistemelor TI, o abordare de gestionare a riscurilor permite unei organizații să
            determine controalele necesare. Aceasta face posibilă studierea procesării,
            prioritizarea riscurilor și tratarea acestora într-un mod proporțional, pentru a
            optimiza costurile și a lua decizii. În cele din urmă, o metodologie precum EIPD ajută o
            companie să demonstreze implementarea principiilor de confidențialitate. În consecință,
            putem admite că un EIPD este un instrument de conformitate; și trebuie utilizat înainte
            de implementarea procesării. EIPD constă în mod normal din mai multe etape. Fiecare
            dintre aceste etape analizează o caracteristică specifică a procesării datelor în
            comparație cu o serie de controale și verificări. Dacă v-ați întrebat vreodată ce face
            un pilot și un copilot înainte de a decola, ei parcurg de fapt o listă de verificare a
            instrumentelor împotriva unei serii de controale reglementate și revizuite. EIPD este
            similar cu acesta, dar are o oarecare flexibilitate, spre deosebire de lista de
            verificare a avionului. EIPD este adaptabilă la profunzimea evaluării care se dorește a
            fi efectuată, ceea ce înseamnă că nu există un interval de timp indicat pentru fiecare
            element de evaluare. Cu alte cuvinte, dacă echipa de evaluare dorește să petreacă timp
            elaborând controale sau să caute și să studieze amenințările la procesare, ar trebui să
            le lăsați să o facă, deoarece remediile vor fi rezultatul așteptat al acestei analize.
            În ceea ce privește metodologia, articolul 35.7 din regulament prevede elementele minime
            care trebuie evaluate, care sunt descrise mai jos în 5 etape:
          </p>
          <ul className={styles.list}>
            <li>
              Este o listă detaliată a procesării datelor, inclusiv: datele pe care le folosește,
              detaliile operatorilor și procesatorilor, baza legală sau perioadele de păstrare
              aplicate datelor.
            </li>
            <li>
              Identifică controalele legale și de tratare a riscurilor care sunt implementate în
              prezent. Această fază implică setul actual și existent de măsuri din punct de vedere
              juridic, tehnic, fizic și organizațional. Obiectivul este de a controla orice riscuri
              care pot fi identificate înainte de implementarea procesării datelor. Dacă, de
              exemplu, o afacere nu și-a revizuit politica privind accesul la sediul său (de
              exemplu: eliberarea insignelor, jurnale de acces etc.), trebuie să o facă mai întâi
              înainte de a extinde o astfel de politică într-o zonă nou construită / dobândită a
              sediului dvs. sau a unui sistem nou.
            </li>
            <li>
              Enumeră sursele de risc pentru prelucrarea datelor. Aceasta ridică următoarea
              întrebare: „va suferi afacerea mea de această nouă prelucrare a datelor și, dacă da,
              unde și când va suferi?” Această fază se concentrează pe posibile intruziuni ale
              confidențialității (de exemplu, daune cauzate de date inexacte sau o încălcare a
              securității) și o evaluare a riscurilor corporative, deteriorarea reputației sau a
              costurilor financiare. Solicită imaginație, în special pentru a răsfoi o cantitate
              echitabilă de surse de risc împotriva companiei. Dacă ne referim la o firmă bancară,
              una dintre sursele de risc este că baza de date ar putea fi compromisă și accesată în
              mod fraudulos. Este un risc de securitate în sine, dar prezintă și un risc financiar
              pentru acțiunile companiei, în timp ce prezintă un risc și privind reputația în fața
              clienților.
            </li>
            <li id="#test">
              Se referă la analiza și listarea potențialelor evenimente negative și amenințări la
              procesarea datelor. Distincția sa față de faza 3 este că se va concentra asupra
              datelor personale ale persoanelor vizate și asupra impactului potențial al noii
              prelucrări asupra acestor date. În cazul în care evenimentele sunt interne sau
              externe, umane sau neumane (tehnice), această fază este relevantă în ceea ce privește
              evoluțiile tehnologice. Este posibil ca noile tehnologii să nu aibă o introducere
              clară a măsurilor de protecție prietenoase confidențialității și astfel să expună
              persoanele vizate la amenințări precum hacking, phishing și spam. Scopul său este de a
              determina la ce tip de amenințări poate fi expusă prelucrarea dvs. Să presupunem că
              sunteți directorul unui spital mare. Dosarele de sănătate ale pacienților sunt foarte
              sensibile. O amenințare umană ar fi că aceste înregistrări sunt accesate de membrii
              personalului greșit dintr-un motiv greșit, iar o amenințare non-umană ar fi că
              sistemul de operare utilizat de spitalul este cel care funcționează de 10 ani fără
              actualizări. În prima instanță, poate apărea un acces neautorizat și fraudulos, în
              timp ce în a doua instanță, poate avea loc un atac cibernetic asupra sistemului de
              operare. În cele din urmă, secretul medical al pacienților va fi amenințat dacă nu se
              remediază amenințarea.
            </li>
            <li>
              Forma unui raport și rezumă analiza, controalele actuale, riscurile pentru afacere și
              amenințările la adresa datelor personale. Raportul stabilește opțiunile organizației
              pentru abordarea fiecărui risc identificat, amenințare și defect. Se precizează dacă
              fiecare opțiune ar duce la eliminarea, reducerea sau acceptarea riscului așa cum este.
              Raportul va fi înregistrat, păstrat și prezentat managerilor principali ai
              organizației. Acești manageri pot decide astfel dacă au fost întreprinse acțiuni sau
              trebuie să fie întreprinse și să urmărească astfel de acțiuni. Putem observa aici că
              astfel de rapoarte contribuie la conformitatea cu principiul responsabilității al
              RGPD. O astfel de evaluare oferă o oportunitate puternică de a revizui documentele, de
              a pregăti implementarea proiectului, de a vă construi sau adapta politicile, de a
              actualiza aspectele tehnice și de a vă consolida controalele. Pe scurt, EIPD
              responsabilizează personalul să facă schimbări și să conștientizeze protecția datelor
              cu caracter personal în cadrul companiei. Demonstrarea conformității către
              autoritățile de protecție a datelor este ceea ce trebuie să fie considerat și trebuie
              să se țină o evidență a acestora. În cazul unui audit pot fi prezentate aceste
              înregistrări. În plus, clienții companiei și persoane vizate vor avea garanția privind
              protecția datelor și reputația.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
