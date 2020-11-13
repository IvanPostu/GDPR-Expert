import React, { Component, CSSProperties, ReactElement } from 'react'
import styles from './styles.module.scss'

type LayoutAlertComponentPropType = {
  className?: string
  style: CSSProperties
}

class LayoutAlertComponent extends Component<LayoutAlertComponentPropType> {
  render(): ReactElement {
    const className = this.props.className ? this.props.className : ''
    return (
      <div style={this.props.style} className={`${styles.container} ${className}`}>
        {this.props.children}
      </div>
    )
  }
}

export const LayoutAlert = LayoutAlertComponent
