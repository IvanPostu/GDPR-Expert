import React, { PropsWithChildren, ReactElement } from 'react'
import styles from './styles.module.scss'

type FormCardAPropType = PropsWithChildren<unknown> &
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export const FormCardA = (props: FormCardAPropType): ReactElement => {
  const className = `${props.className || ''} ${styles.form}`

  return (
    <div className={styles.container}>
      <form {...props} className={className}>
        {props.children}
      </form>
    </div>
  )
}
