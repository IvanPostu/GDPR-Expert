import React, { ReactElement, useRef, useEffect, useCallback, ChangeEvent, useState } from 'react'

type ImageFileInputAPropType = {
  labelName?: string
  base64ImageLoadedHandler: (base64Image: string) => void
}

export const ImageFileInputA = (props: ImageFileInputAPropType): ReactElement => {
  const labelName = props.labelName || ''

  const [b64Image, setb64Image] = useState('')

  const componentIsMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])

  useEffect(() => {
    props.base64ImageLoadedHandler(b64Image)
  }, [b64Image])

  const onFileCangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    const reader = new FileReader()
    reader.onload = (event) => {
      if (componentIsMounted.current) {
        setb64Image(event.target?.result as string)
      }
    }

    reader.readAsDataURL(selectedFiles?.item(0) as Blob)
  }, [])

  return (
    <div>
      <label>{labelName}</label>
      <input type="file" onChange={onFileCangeHandler} />
      <img src={b64Image} style={{ margin: 10, width: 100, height: 100 }} alt="" />
    </div>
  )
}
