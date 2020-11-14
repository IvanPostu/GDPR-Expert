import React, { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react'
import styles from './styles.module.scss'

type TextInputAPropType = {
  labelname?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const TextInputA = (props: TextInputAPropType): ReactElement => {
  const labelname = props.labelname || ''
  return (
    <div className={styles.txtInputContainer}>
      <label>{labelname}</label>
      <input {...props} />
    </div>
  )
}
