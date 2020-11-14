import React, { PropsWithChildren, ReactElement } from 'react'
import styles from './styles.module.scss'

type FormCardAPropType = PropsWithChildren<unknown> &
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const FormCardA = (props: FormCardAPropType): ReactElement => {
  return (
    <div className={styles.container}>
      <form {...props} className={styles.form}>
        {props.children}
      </form>
    </div>
  )
}
