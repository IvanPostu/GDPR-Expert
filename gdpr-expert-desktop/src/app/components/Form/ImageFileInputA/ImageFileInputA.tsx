import React, { ReactElement, useRef, useEffect, useCallback, ChangeEvent } from 'react'

type ImageFileInputAPropType = {
  labelname?: string
  base64Image?: string
  base64ImageLoadedHandler: (base64Image: string) => void
}

export const ImageFileInputA = (props: ImageFileInputAPropType): ReactElement => {
  const labelname = props.labelname || ''

  const componentIsMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])

  const onFileCangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files
      const reader = new FileReader()
      reader.onload = (event) => {
        if (componentIsMounted.current) {
          props.base64ImageLoadedHandler(event.target?.result as string)
        }
      }

      reader.readAsDataURL(selectedFiles?.item(0) as Blob)
    },
    [props],
  )

  return (
    <div>
      <label>{labelname}</label>
      <input type="file" onChange={onFileCangeHandler} />
      <img src={props.base64Image} style={{ margin: 10, width: 100, height: 100 }} alt="" />
    </div>
  )
}
