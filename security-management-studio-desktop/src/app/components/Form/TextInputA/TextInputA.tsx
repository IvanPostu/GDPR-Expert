import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type TextInputAPropType = {
  onTextChange: (str: string) => void
  labelName?: string
  type?: string
}

export const TextInputA = (props: TextInputAPropType): ReactElement => {
  const labelName = props.labelName || ''
  const type = props.type || 'text'
  return (
    <div className={styles.txtInputContainer}>
      <label>{labelName}</label>
      <input type={type} onChange={(e) => props.onTextChange(e.target.value)} />
    </div>
  )
}
