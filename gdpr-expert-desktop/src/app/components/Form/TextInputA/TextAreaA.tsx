import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type TextAreaAPropType = {
  onTextChange: (str: string) => void
  labelName?: string
}

export const TextAreaA = (props: TextAreaAPropType): ReactElement => {
  const labelName = props.labelName || ''
  return (
    <div className={styles.txtInputContainer}>
      <label>{labelName}</label>
      <textarea onChange={(e) => props.onTextChange(e.target.value)} />
    </div>
  )
}
