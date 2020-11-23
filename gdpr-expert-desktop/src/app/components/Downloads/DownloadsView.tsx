import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

type DownloadItem = {
  filename: string
  percent: number
  itemId: string
}

type DownloadsViewPropType = {
  items: Array<DownloadItem>
}

export const DownloadsView = (props: DownloadsViewPropType): ReactElement => {
  return (
    <div className={styles.container}>
      <ul>
        {props.items.map((item) => (
          <li key={item.itemId} className={styles.item}>
            <p>{item.filename}</p>
            <div className={styles.indicator} style={{ width: `${item.percent * 100}%` }} />
          </li>
        ))}
      </ul>
    </div>
  )
}
