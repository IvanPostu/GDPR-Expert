import React, { ReactElement } from 'react'
import styles from './styles.module.scss'

export function Header(): ReactElement {
  return (
    <nav className={styles.topMenu}>
      <label className={styles.logo}>Security Management Studio</label>
      <ul className={styles.listBody}>
        <li className={styles.listItem}>
          <a className={styles.link} href="#">
            1
          </a>
        </li>

        <li className={styles.listItem}>
          <a className={styles.link} href="#">
            2
          </a>
        </li>
      </ul>
    </nav>
  )
}
