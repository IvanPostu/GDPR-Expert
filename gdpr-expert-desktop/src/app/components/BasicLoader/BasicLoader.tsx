import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type LoaderPropType = {
  size?: string
}

export const BasicLoader = (props: LoaderPropType): ReactElement => {
  const size = props.size || '20px'
  return <div style={{ width: size, height: size }} className={styles.loader}></div>
}
