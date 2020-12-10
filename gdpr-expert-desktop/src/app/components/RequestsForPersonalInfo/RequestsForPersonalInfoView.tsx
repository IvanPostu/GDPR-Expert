import { GetPersonalInfoRequestItemType } from '@/app/webApi/personalInfoRequest/getPersonalInfoRequest'
import React, { Fragment, ReactElement } from 'react'
import { FullWidthLoader } from '../BasicLoader'
import { Container } from '../Container'
import { GenericButton } from '../GenericButton'
import styles from './styles.module.scss'
import { RequestForPersonalInfoItem } from './types'

const WIDTH = ['4%', '20%', '36%', '10%', '5%', '15%']
const HEADER_NAMES = [
  '#',
  'Nume/Prenume',
  'Dreptul solicitat',
  'Data recepționării',
  'Statut',
  'Organizația ce procesează datele',
]

type TableRowPropType = {
  item: RequestForPersonalInfoItem
  index: number
}

function TableRow({ item, index }: TableRowPropType): ReactElement {
  return (
    <div className={styles.tableRow + ' ' + styles.hover}>
      <div style={{ width: WIDTH[0] }} className={styles.tableColumn}>
        {index}
      </div>
      <div style={{ width: WIDTH[1] }} className={styles.tableColumn}>
        {item.firstName + ' ' + item.lastName}
      </div>
      <div style={{ width: WIDTH[2] }} className={styles.tableColumn}>
        {item.requestedRight}
      </div>
      <div style={{ width: WIDTH[3] }} className={styles.tableColumn}>
        {item.requestedAt}
      </div>
      <div style={{ width: WIDTH[4] }} className={styles.tableColumn}>
        {item.processed ? 'Finalizat' : 'În așteptare'}
      </div>
      <div style={{ width: WIDTH[5] }} className={styles.tableColumn}>
        {item.organisationName}
      </div>
    </div>
  )
}

type RequestsForPersonalInfoViewPropType = {
  items: Array<GetPersonalInfoRequestItemType>
  isLoad: boolean
  haveNextItems: boolean
  onNextItemsClick: () => void
}

export function RequestsForPersonalInfoView(
  props: RequestsForPersonalInfoViewPropType,
): ReactElement {
  const content =
    Boolean(props.items.length) || props.isLoad ? (
      <Fragment>
        <header className={styles.tableHeader}>
          <div className={styles.tableRow}>
            <div style={{ width: WIDTH[0] }} className={styles.tableColumn}>
              <b>{HEADER_NAMES[0]}</b>
            </div>
            <div style={{ width: WIDTH[1] }} className={styles.tableColumn}>
              <b>{HEADER_NAMES[1]}</b>
            </div>
            <div style={{ width: WIDTH[2] }} className={styles.tableColumn}>
              <b>{HEADER_NAMES[2]}</b>
            </div>
            <div style={{ width: WIDTH[3] }} className={styles.tableColumn}>
              <b>{HEADER_NAMES[3]}</b>
            </div>
            <div style={{ width: WIDTH[4] }} className={styles.tableColumn}>
              <b>{HEADER_NAMES[4]}</b>
            </div>
            <div style={{ width: WIDTH[5] }} className={styles.tableColumn}>
              <b>{HEADER_NAMES[5]}</b>
            </div>
          </div>
        </header>
        <div>
          {props.items.map((item, index) => {
            return <TableRow key={item.personalInfoRequestId} item={item} index={index + 1} />
          })}
          {props.isLoad && <FullWidthLoader />}
          {props.haveNextItems && (
            <div className={styles.nextItemsContainer}>
              <GenericButton
                disabled={props.isLoad}
                onClick={props.onNextItemsClick}
                className={styles.button}
              >
                Următoarele cereri...
              </GenericButton>
            </div>
          )}
        </div>
      </Fragment>
    ) : (
      <div style={{ padding: '40px' }}>
        Pentru organizațiile dvs. nu au fost scrise cereri de exercitare a drepturilor oferite de
        Regulamentul General Privind Protecția datelor cu Caracter Personal RGPD.
      </div>
    )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Registrul cererilor Persoanelor Vizate</h1>
      </div>

      <Container className={styles.body}>{content}</Container>
    </div>
  )
}
