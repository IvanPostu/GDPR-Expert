import React, { DetailedHTMLProps, ReactElement, TextareaHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type TextAreaAPropType = {
  labelname?: string
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export const TextAreaA = (props: TextAreaAPropType): ReactElement => {
  const labelname = props.labelname || ''
  return (
    <div className={styles.txtInputContainer}>
      <label>{labelname}</label>
      <textarea {...props} />
    </div>
  )
}
