import { GlobalStateType } from '@/app/store'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Container } from '../Container'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisation: state.organisationInfoReducer.organisation,
  }
}

type GDPREvaluationLayoutComponentPropType = PropsWithChildren<unknown> &
  ReturnType<typeof mapStateToProps>

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
          <GenericButton className={styles.button}>Rezultatul ultimii evaluări</GenericButton>
          <GenericButton className={styles.button}>Realizare evaluare</GenericButton>
        </Container>
      </div>

      <div>{props.children}</div>
    </div>
  )
}

export const GDPREvaluationLayout = connect(mapStateToProps)(GDPREvaluationLayoutComponent)
