import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type LoaderPropType = {
  size?: string
  centered?: boolean
}

export const BasicLoader = (props: LoaderPropType): ReactElement => {
  const size = props.size || '20px'
  const centeredStyle = props.centered ? { display: 'flex', justifyContent: 'center' } : {}

  return (
    <div style={centeredStyle}>
      <div style={{ width: size, height: size }} className={styles.loader}></div>
    </div>
  )
}
