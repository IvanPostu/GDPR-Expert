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
  const className = `${props.className} ${styles.btn} `

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  )
}
