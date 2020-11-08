import React, { ReactElement } from 'react'
import { IoIosCreate, IoIosTrash, IoIosInformationCircleOutline } from 'react-icons/io'
import styles from './styles.module.scss'

type GenericTableAPropType = {
  // cellSizes: Array<string>
  headerCells: Array<string>
  cells: Array<Array<string>>
  actionsWidth?: string
}

export const GenericTableA = (props: GenericTableAPropType): ReactElement => {
  const actionsStyles = { width: props.actionsWidth ? props.actionsWidth : '15%' }
  const content = props.cells.map((item, index) => {
    return (
      <div key={index} className={styles.row}>
        {item.map((cell, cellIndex) => (
          <div key={cellIndex} className={styles.cell}>
            {cell}
          </div>
        ))}
        <div style={actionsStyles} className={styles.cell}>
          <button className={styles.action} style={{ background: 'rgb(0, 145, 0)' }}>
            <IoIosInformationCircleOutline style={{ fontSize: 24 }} />
          </button>
          <button className={styles.action}>
            <IoIosCreate style={{ fontSize: 24 }} />
          </button>
          <button className={styles.action} style={{ background: 'rgb(145, 0, 0)' }}>
            <IoIosTrash style={{ fontSize: 24 }} />
          </button>
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
