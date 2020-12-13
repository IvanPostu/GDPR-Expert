import React, { ReactElement } from 'react'
import { Container } from '../Container'
import { TextAreaA } from '../Form/TextInputA'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'

export default function DPIAEvaluationView(): ReactElement {
  return (
    <form className={styles.container}>
      <Container>
        <div className={styles.card}>
          <h1>Realizarea evaluării a impactului privind protecția datelor conform R.G.P.D.</h1>

          <span>
            <b>Etapa 1</b> Este nevoie de indicat listă detaliată a procesării datelor, inclusiv:
            datele pe care le folosește, detaliile operatorilor și procesatorilor, baza legală sau
            perioadele de păstrare aplicate datelor.
          </span>
          <TextAreaA style={{ height: '300px' }} labelname="" />
        </div>

        <div className={styles.card}>
          <span>
            <b>Etapa 2</b> Este nevoie de indicat setul actual și existent de măsuri din punct de
            vedere juridic, tehnic, fizic și organizațional.
          </span>
          <TextAreaA style={{ height: '300px' }} />
        </div>

        <div className={styles.card}>
          <span>
            <b>Etapa 3</b> Este nevoie de enumerat sursele de risc pentru prelucrarea datelor.
          </span>
          <TextAreaA style={{ height: '300px' }} />
        </div>

        <div className={styles.card}>
          <span>
            <b>Etapa 4</b> Analiza și listarea potențialelor evenimente negative și amenințări la
            procesarea datelor.
          </span>
          <TextAreaA style={{ height: '300px' }} />
        </div>

        <div className={styles.card}>
          <span>
            <b>Etapa 5</b> Este nevoie de rezumat analiza, controalele actuale, riscurile pentru
            afacere și amenințările la adresa datelor personale.
          </span>
          <TextAreaA style={{ height: '300px' }} />
          <div>
            <GenericButton type="button" className={styles.btn}>
              Salvează
            </GenericButton>
          </div>
        </div>
      </Container>
    </form>
  )
}
