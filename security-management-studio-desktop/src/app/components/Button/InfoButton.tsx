import React, { FC, ReactElement } from 'react'
import { ButtonPropType } from './types'
import styles from './global.module.scss'
import infoButtonStyles from './infoButton.module.scss'

export const InfoButton: FC<ButtonPropType> = (props: ButtonPropType): ReactElement => {
  return (
    <button className={`${styles.btn} ${infoButtonStyles.infoButton}`} onClick={props.onClick}>
      {props.title}
    </button>
  )
}
