import React, { FC, PropsWithChildren, ReactElement } from 'react'
import { Container } from '@/app/components/Container'
import styles from './employeeCard.module.scss'
import { IoMdPerson } from 'react-icons/io'

type EmployeeCardPropType = {
  fullname: string
} & PropsWithChildren<unknown>

export const EmployeeCard: FC<EmployeeCardPropType> = (
  props: EmployeeCardPropType,
): ReactElement => {
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.preview}>
          <span style={{ fontSize: '90px' }}>
            <IoMdPerson />
          </span>
          <h2>{props.fullname}</h2>
        </div>
        <div className={styles.info}>{props.children}</div>
      </div>
    </Container>
  )
}
