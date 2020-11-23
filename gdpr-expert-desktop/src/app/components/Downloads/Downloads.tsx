import React, { Component, ReactElement } from 'react'
import { DownloadsView } from './DownloadsView'

export class Downloads extends Component {
  render(): ReactElement {
    return (
      <DownloadsView
        items={[
          { filename: 'Abcdw.docx', itemId: '1adfdaf', percent: 0.78 },
          { filename: 'Qqrqereqr.docx', itemId: '2adfdaf', percent: 0.99 },
          {
            filename: 'SHDIhskd_dajfkaadfjadhadfadfadfkjfhajdkf.docx',
            itemId: '3adfdaf',
            percent: 0.01111,
          },
        ]}
      />
    )
  }
}
