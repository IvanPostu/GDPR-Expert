import React, { ReactElement } from 'react'
import { LayoutAlert } from '../LayoutAlert/LayoutAlert'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { InfoButton } from '../../Button/InfoButton'

type ErrorAlertPropType = {
  text?: string
  onOkClick: () => void
}

export const ErrorAlert = (props: ErrorAlertPropType): ReactElement => {
  const text = props.text || ''

  return (
    <LayoutAlert style={{}}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{ color: 'rgb(128, 0, 0)', fontSize: '60px' }}>
          <IoIosCloseCircleOutline />
        </span>
        <b style={{ fontSize: 30 }}>Error</b>
        <p style={{ margin: '10px' }}>{text}</p>

        <div>
          <InfoButton onClick={props.onOkClick} title="Ok" />
        </div>
      </div>
    </LayoutAlert>
  )
}
