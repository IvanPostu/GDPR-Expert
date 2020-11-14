import React, { ReactElement } from 'react'
import { BasicLoader } from './BasicLoader'

export const FullWidthLoader = (): ReactElement => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <BasicLoader size="100px" />
    </div>
  )
}
