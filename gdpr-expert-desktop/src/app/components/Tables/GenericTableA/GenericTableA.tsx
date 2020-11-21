import React, { ReactElement } from 'react'
import { IoIosCreate, IoIosTrash, IoIosInformationCircleOutline } from 'react-icons/io'
import styles from './styles.module.scss'

type GenericTableAPropType = {
  // cellSizes: Array<string>
  headerCells: Array<string>
  cells: Array<{ [key: string]: string }>
  actionsWidth?: string
  onDeleteClick?: (id: string) => void
  onUpdateClick?: (id: string) => void
  onInfoClick?: (id: string) => void
}

export const GenericTableA = (props: GenericTableAPropType): ReactElement => {
  const actionsStyles = { width: props.actionsWidth ? props.actionsWidth : '15%' }
  const content = props.cells.map((item, index) => {
    return (
      <div key={index} className={styles.row}>
        {Object.keys(item)
          .filter((key) => key !== 'id')
          .map((key, cellIndex) => (
            <div key={cellIndex} className={styles.cell}>
              {item[key]}
            </div>
          ))}
        <div style={actionsStyles} className={styles.cell}>
          {props.onInfoClick && (
            <button
              onClick={props.onInfoClick?.bind(null, item['id'])}
              className={styles.action}
              style={{ background: 'rgb(0, 145, 0)' }}
            >
              <IoIosInformationCircleOutline style={{ fontSize: 24 }} />
            </button>
          )}
          {props.onUpdateClick && (
            <button onClick={props.onUpdateClick?.bind(null, item['id'])} className={styles.action}>
              <IoIosCreate style={{ fontSize: 24 }} />
            </button>
          )}
          {props.onDeleteClick && (
            <button
              onClick={props.onDeleteClick?.bind(null, item['id'])}
              className={styles.action}
              style={{ background: 'rgb(145, 0, 0)' }}
            >
              <IoIosTrash style={{ fontSize: 24 }} />
            </button>
          )}
        </div>
      </div>
    )
  })

  return (
    <div className={styles.table}>
      <div className={styles.rowHeader}>
        {props.headerCells.map((item, index) => (
          <div key={index} className={styles.cell}>
            {item}
          </div>
        ))}
        <div style={actionsStyles} className={styles.cell}>
          Acțiuni
        </div>
      </div>
      {content}
    </div>
  )
}
