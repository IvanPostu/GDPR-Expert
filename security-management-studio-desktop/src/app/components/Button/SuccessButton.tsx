import React, { ReactElement } from 'react'
import { ButtonPropType } from './types'
import styles from './global.module.scss'
import successButtonStyle from './successButton.module.scss'

export const SuccessButton = (props: ButtonPropType): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onClick = props.onClick ? props.onClick : () => {}

  return (
    <button className={`${styles.btn} ${successButtonStyle.infoButton}`} onClick={onClick}>
      {props.title}
    </button>
  )
}
