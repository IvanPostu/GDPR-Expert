import React, { ReactElement, SyntheticEvent } from 'react'
import { Container } from '../Container'
import { TextAreaA } from '../Form/TextInputA'
import { GenericButton } from '../GenericButton'
import { DPIADataType } from './DPIAEvaluation'
import styles from './styles.module.scss'

interface DPIAEvaluationViewPropType {
  DPIA: DPIADataType
  setDPIAData: (data: DPIADataType) => void
  onSubmit: (e: SyntheticEvent) => void
}

export default function DPIAEvaluationView({
  DPIA,
  setDPIAData,
  onSubmit,
}: DPIAEvaluationViewPropType): ReactElement {
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <Container>
        <div className={styles.card}>
          <h1>Realizarea evaluării a impactului privind protecția datelor conform R.G.P.D.</h1>

          <span>
            <b>Etapa 1</b> Este nevoie de indicat listă detaliată a procesării datelor, inclusiv:
            datele pe care le folosește, detaliile operatorilor și procesatorilor, baza legală sau
            perioadele de păstrare aplicate datelor.
          </span>
          <TextAreaA
            onChange={(e) => setDPIAData({ ...DPIA, stageOneDataDetails: e.target.value })}
            value={DPIA.stageOneDataDetails}
            style={{ height: '300px' }}
            labelname=""
          />
        </div>

        <div className={styles.card}>
          <span>
            <b>Etapa 2</b> Este nevoie de indicat setul actual și existent de măsuri din punct de
            vedere juridic, tehnic, fizic și organizațional.
          </span>
          <TextAreaA
            onChange={(e) => setDPIAData({ ...DPIA, stageTwoCurrentSetOfMeasures: e.target.value })}
            value={DPIA.stageTwoCurrentSetOfMeasures}
            style={{ height: '300px' }}
          />
        </div>

        <div className={styles.card}>
          <span>
            <b>Etapa 3</b> Este nevoie de enumerat sursele de risc pentru prelucrarea datelor.
          </span>
          <TextAreaA
            onChange={(e) => setDPIAData({ ...DPIA, stageThreeSourcesOfRisk: e.target.value })}
            value={DPIA.stageThreeSourcesOfRisk}
            style={{ height: '300px' }}
          />
        </div>

        <div className={styles.card}>
          <span>
            <b>Etapa 4</b> Analiza și listarea potențialelor evenimente negative și amenințări la
            procesarea datelor.
          </span>
          <TextAreaA
            onChange={(e) =>
              setDPIAData({ ...DPIA, stageFourPotentialAdverseEventsAndThreats: e.target.value })
            }
            value={DPIA.stageFourPotentialAdverseEventsAndThreats}
            style={{ height: '300px' }}
          />
        </div>

        <div className={styles.card}>
          <span>
            <b>Etapa 5</b> Este nevoie de rezumat analiza, controalele actuale, riscurile pentru
            afacere și amenințările la adresa datelor personale.
          </span>
          <TextAreaA
            onChange={(e) =>
              setDPIAData({ ...DPIA, stageFiveSummaryAnalysisAndCurrentControls: e.target.value })
            }
            value={DPIA.stageFiveSummaryAnalysisAndCurrentControls}
            style={{ height: '300px' }}
          />
          <div>
            <GenericButton type="submit" className={styles.btn}>
              Salvează
            </GenericButton>
          </div>
        </div>
      </Container>
    </form>
  )
}
