import React, { Component, Fragment, PropsWithChildren, ReactElement } from 'react'

type ErrorBoundaryPropType = PropsWithChildren<unknown>

class ErrorBoundaryComponent extends Component<ErrorBoundaryPropType> {
  constructor(props: ErrorBoundaryPropType) {
    super(props)
  }

  componentDidCatch(): void {
    location.reload()
  }

  render(): ReactElement {
    return <Fragment>{this.props.children}</Fragment>
  }
}

export const ErrorBoundaryWrapper = ErrorBoundaryComponent
