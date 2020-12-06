import React, { ReactElement } from 'react'
import { SuccessButton } from '../../Button/SuccessButton'
import { LayoutAlert } from '../LayoutAlert/LayoutAlert'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

type SuccessAlertPropType = {
  title?: string
  text?: string
  onOkClick: () => void
}

export const SuccessAlert = (props: SuccessAlertPropType): ReactElement => {
  const text = props.text || ''
  const title = props.title || 'Success'

  return (
    <LayoutAlert style={{}}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{ color: 'green', fontSize: '60px' }}>
          <IoIosCheckmarkCircleOutline />
        </span>
        <b style={{ fontSize: 30 }}>{title}</b>
        <p style={{ margin: '10px' }}>{text}</p>

        <div>
          <SuccessButton onClick={props.onOkClick} title="Ok" />
        </div>
      </div>
    </LayoutAlert>
  )
}
