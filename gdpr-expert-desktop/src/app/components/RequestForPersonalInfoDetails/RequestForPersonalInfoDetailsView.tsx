import React, { ReactElement } from 'react'
import { FullWidthLoader } from '../BasicLoader'
import { Container } from '../Container'
import styles from './styles.module.scss'

type RequestForPersonalInfoDetailsView = {
  items: { [key: string]: string }
  isLoad: boolean
}

const RequestForPersonalInfoDetailsView = (
  props: RequestForPersonalInfoDetailsView,
): ReactElement => {
  if (props.isLoad) return <FullWidthLoader />

  const content = Object.keys(props.items).map((key) => (
    <div key={key} className={styles.row}>
      <div className={styles.column}>
        <span className={styles.text}>{key}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.text}>{props.items[key]}</span>
      </div>
    </div>
  ))

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.row}>
          <h5 className={styles.title}>
            Informație relativ la cererea de solicitare a datelor cu caracter personal
          </h5>
        </div>
        {content}
      </div>
    </Container>
  )
}

export default RequestForPersonalInfoDetailsView
