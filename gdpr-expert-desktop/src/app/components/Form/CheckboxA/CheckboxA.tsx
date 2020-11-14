import React, { ChangeEvent, ReactElement } from 'react'
import styles from './styles.module.scss'

type CheckboxAPropType = {
  labelname?: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxA = (props: CheckboxAPropType): ReactElement => {
  const labelname = props.labelname || ''
  return (
    <div className={styles.container}>
      <label>{labelname}</label>
      <input type={'checkbox'} checked={props.checked} onChange={props.onChange} />
    </div>
  )
}
