import React, {
  ChangeEvent,
  Fragment,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { GenericButton } from '../../GenericButton'
import styles from './styles.module.scss'
import { IoIosClose } from 'react-icons/io'

function fileViewElements(
  files: Array<{
    file: File
    id: string
  }>,
  removeFileCallback: (filename: string) => void,
): ReactElement {
  const strMinimizer = (str: string) => (str.length > 30 ? str.substring(0, 30) + '...' : str)

  const result = (
    <Fragment>
      {files.map((item) => (
        <li key={item.id}>
          <div className={styles.fileItem}>
            <a>{strMinimizer(item.file.name)}</a>
            <span onClick={removeFileCallback.bind(null, item.id)} className={styles.removeIcon}>
              <IoIosClose />
            </span>
          </div>
        </li>
      ))}
    </Fragment>
  )

  return result
}

type FilesInputAPropType = PropsWithChildren<unknown> & {
  labelname?: string
  onAddFiles: (files: FileList) => void
  remove: (filename: string) => void
  files: Array<{
    file: File
    id: string
  }>
}

export const FilesInputA = (props: FilesInputAPropType): ReactElement => {
  const labelname = props.labelname || ''

  const componentIsMounted = useRef(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])

  const onFileCangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files
      if (selectedFiles !== null) {
        props.onAddFiles(selectedFiles)
      }
    },
    [props],
  )

  return (
    <div className={styles.container}>
      <label>{labelname}</label>
      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        className={styles.fileInputClass}
        type="file"
        onChange={onFileCangeHandler}
        multiple
      />
      <GenericButton
        type="button"
        className={styles.addButton}
        onClick={() => fileInputRef.current?.click()}
      >
        Adaugă fișier
      </GenericButton>
      <ul className={styles.filesContainer}>{fileViewElements(props.files, props.remove)}</ul>
    </div>
  )
}
