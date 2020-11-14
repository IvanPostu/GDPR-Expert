import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  ReactElement,
} from 'react'
import styles from './styles.module.scss'

type GenericButtonPropType = PropsWithChildren<unknown> &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const GenericButton = (props: GenericButtonPropType): ReactElement => {
  return (
    <button className={styles.btn} {...props}>
      {props.children}
    </button>
  )
}
