import React, { ReactElement, PropsWithChildren } from 'react'
import styles from './styles.module.scss'

type ContainerPropType = {
  className?: string
} & PropsWithChildren<unknown>

export function Container(props: ContainerPropType): ReactElement {
  const className = props.className || ''
  return <div className={`${styles.container} ${className}`}>{props.children}</div>
}
