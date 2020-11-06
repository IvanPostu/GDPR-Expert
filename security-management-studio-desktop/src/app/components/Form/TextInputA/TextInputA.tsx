import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type TextInputAPropType = {
  onTextChange: (str: string) => void
  labelName?: string
}

export const TextInputA = (props: TextInputAPropType): ReactElement => {
  const labelName = props.labelName || ''
  return (
    <div className={styles.txtInputContainer}>
      <label>{labelName}</label>
      <input onChange={(e) => props.onTextChange(e.target.value)} />
    </div>
  )
}
