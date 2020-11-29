import { GlobalStateType } from '@/app/store'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Container } from '../Container'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'
import { History } from 'history'
import { gDPRLastEvaluationInfoPageRedirect } from '@/app/pages/GDPREvaluationPage/GDPRLastEvaluationInfoPage/gDPRLastEvaluationInfoPageRedirect'
import { gDPREvaluationPageRedirect } from '@/app/pages/GDPREvaluationPage/GDPREvaluationPage/gDPREvaluationPageRedirect'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisation: state.organisationInfoReducer.organisation,
  }
}

type GDPREvaluationLayoutComponentPropType = PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps> & {
    history: History
  }

const GDPREvaluationLayoutComponent: FC<GDPREvaluationLayoutComponentPropType> = (
  props: GDPREvaluationLayoutComponentPropType,
): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>
            Evaluarea conformităților cu G.D.P.R. pentru organizația{' '}
            {`"${props.organisation.organisationName}"`}
          </p>
        </div>
        <Container className={styles.buttons}>
          <GenericButton
            className={styles.button}
            onClick={gDPRLastEvaluationInfoPageRedirect.bind(null, { history: props.history })}
          >
            Rezultatul ultimii evaluări
          </GenericButton>
          <GenericButton
            onClick={gDPREvaluationPageRedirect.bind(null, { history: props.history })}
            className={styles.button}
          >
            Realizare evaluare
          </GenericButton>
        </Container>
      </div>

      <Container>{props.children}</Container>
    </div>
  )
}

export const GDPREvaluationLayout = connect(mapStateToProps)(GDPREvaluationLayoutComponent)
