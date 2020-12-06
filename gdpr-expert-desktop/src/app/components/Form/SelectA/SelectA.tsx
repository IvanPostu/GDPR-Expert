import React, { ReactElement, ChangeEvent, useCallback, useState } from 'react'
import styles from './styles.module.scss'

type SelectAPropType = {
  defaultValue?: string
  title: string
  disabled?: boolean
  items: Array<string>
  setSelectedItem?: (str: string) => void
  setSelectedItemIndex?: (index: number) => void
}

export const SelectA = (props: SelectAPropType): ReactElement => {
  const defaultValue = props.defaultValue || ''
  const [selectedElementIndex, setSelectedElementIndex] = useState(() => {
    let result = 0
    for (let i = 0; i < props.items.length; i++) {
      if (props.items[i] === defaultValue) {
        result = i
        break
      }
    }
    return result
  })

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const itemIndex = Number(e.target.value)
      setSelectedElementIndex(itemIndex)
      props.setSelectedItem && props.setSelectedItem(props.items[itemIndex])
      props.setSelectedItemIndex && props.setSelectedItemIndex(itemIndex)
    },
    [selectedElementIndex, props],
  )

  const items = props.items.map((item, index) => (
    <option key={index} value={index}>
      {item}
    </option>
  ))

  return (
    <div className={styles.container}>
      <label>{props.title}</label>
      <select disabled={props.disabled} value={selectedElementIndex} onChange={onChange}>
        {items}
      </select>
    </div>
  )
}
