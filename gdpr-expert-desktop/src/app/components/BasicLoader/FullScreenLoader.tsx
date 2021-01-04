import React, { ReactElement } from 'react'
import { BasicLoader } from './BasicLoader'
import styles from './styles.module.scss'

export const FullScreenLoader = (): ReactElement => {
  return (
    <div className={styles.fullscreenContainer}>
      <div className={styles.loaderContainer}></div>
      <BasicLoader size="100px" />
    </div>
  )
}
