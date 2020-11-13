import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type ButtonAPropType = {
  title: string
  type?: 'submit' | 'reset' | 'button'
}

export const ButtonA = (props: ButtonAPropType): ReactElement => {
  const type = props.type || 'button'
  return (
    <button type={type} className={styles.btn}>
      {props.title}
    </button>
  )
}
