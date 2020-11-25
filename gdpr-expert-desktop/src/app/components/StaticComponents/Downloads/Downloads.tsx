import { GlobalStateType } from '@/app/store'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { DownloadsView } from './DownloadsView'

function mapStateToProps(state: GlobalStateType) {
  return {
    downloads: state.downloadsReducer.downloads,
  }
}

type DownloadsComponentPropType = ReturnType<typeof mapStateToProps>

class DownloadsComponent extends Component<DownloadsComponentPropType> {
  constructor(props: DownloadsComponentPropType) {
    super(props)
  }

  render(): ReactElement {
    const items = this.props.downloads.map((item) => ({
      filename: item.filename,
      itemId: item.id,
      percent: item.percent,
    }))

    return <DownloadsView items={items} />
  }
}

export const Downloads = connect(mapStateToProps)(DownloadsComponent)
