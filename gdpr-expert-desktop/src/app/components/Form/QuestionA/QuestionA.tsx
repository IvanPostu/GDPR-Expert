import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react'
import styles from './styles.module.scss'

type QuestionAPropType = {
  question: string
  items: Array<string>
  setSelectedItem: (str: string) => void
}

export const QuestionA = (props: QuestionAPropType): ReactElement => {
  const [selectedElementIndex, setSelectedElementIndex] = useState(0)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const itemIndex = Number(e.target.value)
      setSelectedElementIndex(itemIndex)
      props.setSelectedItem(props.items[itemIndex])
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
      <label>{props.question}</label>
      <select value={selectedElementIndex} onChange={onChange}>
        {items}
      </select>
    </div>
  )
}
