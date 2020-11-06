import React, { FC, ReactElement } from 'react'
import { ButtonPropType } from './types'
import styles from './global.module.scss'
import infoButtonStyles from './infoButton.module.scss'

export const InfoButton: FC<ButtonPropType> = (props: ButtonPropType): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onClick = props.onClick ? props.onClick : () => {}

  return (
    <button className={`${styles.btn} ${infoButtonStyles.infoButton}`} onClick={onClick}>
      {props.title}
    </button>
  )
}
