import React, { PropsWithChildren, ReactElement, SyntheticEvent } from 'react'
import styles from './styles.module.scss'

type FormCardAPropType = PropsWithChildren<unknown> & {
  onSubmit: (e: SyntheticEvent) => void
  onClick?: (e: SyntheticEvent) => void
}

export const FormCardA = (props: FormCardAPropType): ReactElement => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <form onSubmit={props.onSubmit} className={styles.form}>
        {props.children}
      </form>
    </div>
  )
}
