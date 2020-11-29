/* eslint-disable no-console */
import React, { Component, ErrorInfo, Fragment, PropsWithChildren, ReactElement } from 'react'

type ErrorBoundaryPropType = PropsWithChildren<unknown>

class ErrorBoundaryComponent extends Component<ErrorBoundaryPropType> {
  constructor(props: ErrorBoundaryPropType) {
    super(props)
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const isDev = process.env.NODE_ENV === 'development'
    if (!isDev) {
      location.reload()
    }

    console.error(error)
    console.error(errorInfo)
  }

  render(): ReactElement {
    return <Fragment>{this.props.children}</Fragment>
  }
}

export const ErrorBoundaryWrapper = ErrorBoundaryComponent
