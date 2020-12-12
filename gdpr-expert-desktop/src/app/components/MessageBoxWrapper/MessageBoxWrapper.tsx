import React, { Fragment, PropsWithChildren, PureComponent, ReactElement } from 'react'
import { ErrorAlert } from '../CustomAlert/ErrorAlert/ErrorAlert'
import { SuccessAlert } from '../CustomAlert/SuccessAlert/SuccessAlert'

export type MessageBoxWrapperPropType = {
  title?: string
  message: string
  type: 'error' | 'success'
  withContent?: boolean
  onOkClick: () => void
} & PropsWithChildren<unknown>

export class MessageBoxWrapper extends PureComponent<MessageBoxWrapperPropType> {
  render(): ReactElement | null {
    const { message, onOkClick, type, children } = this.props

    if (!Boolean(message)) return <Fragment>{children}</Fragment>

    if (type === 'success') {
      return (
        <Fragment>
          <SuccessAlert title={this.props.title} onOkClick={onOkClick} text={message} />
          {this.props.withContent && children}
        </Fragment>
      )
    }

    if (type === 'error') {
      return (
        <Fragment>
          <ErrorAlert title={this.props.title} onOkClick={onOkClick} text={message} />
          {this.props.withContent && children}
        </Fragment>
      )
    }

    return null
  }
}
