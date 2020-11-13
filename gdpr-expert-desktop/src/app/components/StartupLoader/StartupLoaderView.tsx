import React, { Component, ReactElement } from 'react'
import styles from './styles.module.scss'
import image from '@/app/assets/images/GDPR.png'

type StartupLoaderViewPropType = {
  progressPercentage: number
}

export default class StartupLoaderView extends Component<StartupLoaderViewPropType> {
  render(): ReactElement {
    return (
      <div className={styles.container}>
        <div>{/* <h1>GDPR Expert</h1> */}</div>
        <div>
          <img src={image} width="400px" />
        </div>

        <div style={{ width: `${this.props.progressPercentage}%` }} className={styles.loader}></div>
        <div className={styles.loaderBack}></div>
      </div>
    )
  }
}
