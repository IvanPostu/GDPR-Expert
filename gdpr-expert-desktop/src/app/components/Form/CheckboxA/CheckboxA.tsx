import React, { ChangeEvent, ReactElement } from 'react'
import styles from './styles.module.scss'

type CheckboxAPropType = {
  labelName?: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxA = (props: CheckboxAPropType): ReactElement => {
  const labelName = props.labelName || ''
  return (
    <div className={styles.container}>
      <label>{labelName}</label>
      <input type={'checkbox'} checked={props.checked} onChange={props.onChange} />
    </div>
  )
}
