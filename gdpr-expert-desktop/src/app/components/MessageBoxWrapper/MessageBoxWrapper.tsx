import React, { Fragment, PropsWithChildren, PureComponent, ReactElement } from 'react'
import { ErrorAlert } from '../CustomAlert/ErrorAlert/ErrorAlert'
import { SuccessAlert } from '../CustomAlert/SuccessAlert/SuccessAlert'

export type MessageBoxWrapperPropType = {
  title?: string
  message: string
  type: 'error' | 'success'
  onOkClick: () => void
} & PropsWithChildren<unknown>

export class MessageBoxWrapper extends PureComponent<MessageBoxWrapperPropType> {
  render(): ReactElement | null {
    const { message, onOkClick, type, children } = this.props

    if (!Boolean(message)) return <Fragment>{children}</Fragment>

    if (type === 'success')
      return <SuccessAlert title={this.props.title} onOkClick={onOkClick} text={message} />

    if (type === 'error')
      return <ErrorAlert title={this.props.title} onOkClick={onOkClick} text={message} />

    return null
  }
}
