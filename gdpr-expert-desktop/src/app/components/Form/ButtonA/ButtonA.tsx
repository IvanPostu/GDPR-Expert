import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  ReactElement,
} from 'react'
import styles from './styles.module.scss'

type ButtonAPropType = PropsWithChildren<unknown> &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const ButtonA = (props: ButtonAPropType): ReactElement => {
  let className = props.className || ''
  className = className + ' ' + styles.btn
  const customProps: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > = {
    ...props,
    className,
  }

  return <button {...customProps}>{props.title}</button>
}
