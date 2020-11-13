import React, { PropsWithChildren, ReactElement, SyntheticEvent } from 'react'
import styles from './styles.module.scss'

type FormCardAPropType = PropsWithChildren<unknown> & {
  onSubmit: (e: SyntheticEvent) => void
  onClick?: (e: SyntheticEvent) => void
  cardBackgroundColor?: string
}

export const FormCardA = (props: FormCardAPropType): ReactElement => {
  const cardBackgroundColor = props.cardBackgroundColor || 'white'

  return (
    <div className={styles.container} onClick={props.onClick}>
      <form
        style={{ background: cardBackgroundColor }}
        onSubmit={props.onSubmit}
        className={styles.form}
      >
        {props.children}
      </form>
    </div>
  )
}
