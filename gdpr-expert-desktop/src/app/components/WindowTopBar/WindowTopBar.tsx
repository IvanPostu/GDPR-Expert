/* eslint-disable @typescript-eslint/no-var-requires */
import React, { ReactElement, PropsWithChildren, useCallback } from 'react'
import {
  IoMdClose,
  IoIosResize,
  IoIosRemove,
  IoIosArrowBack,
  IoIosArrowForward,
} from 'react-icons/io'
import { IconType } from 'react-icons'
import { remote } from 'electron'
import styles from './styles.module.scss'
import { useHistory } from 'react-router-dom'

const DEFAULT_COLOR = '#a0a0a0'
const DARK_COLOR = '#8b8b8b'

type CustomButtonProps = {
  icon: IconType
  onClick: () => void
} & PropsWithChildren<unknown>

function CustomButton(props: CustomButtonProps): ReactElement {
  const [iconColor, setIconColor] = React.useState(DEFAULT_COLOR)
  const Icon = props.icon

  return (
    <span
      onClick={props.onClick}
      className={styles.button}
      onMouseEnter={() => setIconColor(DARK_COLOR)}
      onMouseLeave={() => setIconColor(DEFAULT_COLOR)}
    >
      <Icon size="30px" fill={iconColor} />
    </span>
  )
}

export const WindowTopBar = (): ReactElement => {
  const onMinimizeClick = useCallback(() => {
    const nativeWindow = remote.getCurrentWindow()
    nativeWindow.minimize()
  }, [])

  const onResizeClick = useCallback(() => {
    const nativeWindow = remote.getCurrentWindow()
    if (nativeWindow.isMaximized()) {
      nativeWindow.unmaximize()
    } else {
      nativeWindow.maximize()
    }
  }, [])

  const onCloseClick = useCallback(() => {
    const nativeWindow = remote.getCurrentWindow()
    nativeWindow.close()
  }, [])

  const history = useHistory()

  return (
    <div className={styles.container}>
      <div className={styles.iconsContainer}>
        <CustomButton onClick={() => history.goBack()} icon={IoIosArrowBack} />
        <CustomButton onClick={() => history.goForward()} icon={IoIosArrowForward} />
      </div>
      <div className={styles.iconsContainer}>
        <CustomButton onClick={onMinimizeClick} icon={IoIosRemove} />
        <CustomButton onClick={onResizeClick} icon={IoIosResize} />
        <CustomButton onClick={onCloseClick} icon={IoMdClose} />
      </div>
    </div>
  )
}
