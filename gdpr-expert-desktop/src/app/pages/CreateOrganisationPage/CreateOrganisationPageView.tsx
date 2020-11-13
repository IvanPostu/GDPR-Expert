import { BasicLoader } from '@/app/components/BasicLoader'
import { ButtonA } from '@/app/components/Form/ButtonA'
import { FormCardA } from '@/app/components/Form/FormCardA'
import { SelectA } from '@/app/components/Form/SelectA'
import { TextInputA, TextAreaA } from '@/app/components/Form/TextInputA'
import { ImageFileInputA } from '@/app/components/Form/ImageFileInputA'
import React, { FC, Fragment, ReactElement, SyntheticEvent, useCallback, useState } from 'react'
import { legalForms } from './legalForms'
import { OrganisationDataType } from './types'
import { ErrorAlert } from '@/app/components/CustomAlert/ErrorAlert/ErrorAlert'
import { SuccessAlert } from '@/app/components/CustomAlert/SuccessAlert/SuccessAlert'

type CreateOrganisationPageViewPropType = {
  onOrganisationCreate: (organisation: OrganisationDataType) => void
  isLoading: boolean
  isErrorMessage: boolean
  message: string
  onSuccess: () => void
  clearMessage: () => void
}

export const CreateOrganisationPageView: FC<CreateOrganisationPageViewPropType> = (
  props: CreateOrganisationPageViewPropType,
): ReactElement => {
  const isLoading = props.isLoading
  const message = props.message
  const [organisationData, setOrganisationData] = useState<OrganisationDataType>({
    organisationName: '',
    address: '',
    email: '',
    telephone: '',
    legalRepresentative: '',
    legalForm: '',
    description: '',
    base64Image: '',
  })

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      props.onOrganisationCreate(organisationData)
    },
    [organisationData],
  )

  let content = isLoading ? (
    <div style={{ left: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BasicLoader size="100px" />
    </div>
  ) : (
    <Fragment>
      <TextInputA
        labelName="Denumire organizație:"
        onTextChange={(str: string) =>
          setOrganisationData({
            ...organisationData,
            organisationName: str,
          })
        }
      />
      <TextInputA
        labelName="Adresa juridică:"
        onTextChange={(str: string) =>
          setOrganisationData({
            ...organisationData,
            address: str,
          })
        }
      />
      <TextInputA
        labelName="Email:"
        onTextChange={(str: string) =>
          setOrganisationData({
            ...organisationData,
            email: str,
          })
        }
      />
      <TextInputA
        labelName="Telefon:"
        onTextChange={(str: string) =>
          setOrganisationData({
            ...organisationData,
            telephone: str,
          })
        }
      />
      <TextInputA
        labelName="Reprezentant legal:"
        onTextChange={(str: string) =>
          setOrganisationData({
            ...organisationData,
            legalRepresentative: str,
          })
        }
      />
      <TextAreaA
        labelName="Descriere organizație: "
        onTextChange={(str: string) =>
          setOrganisationData({
            ...organisationData,
            description: str,
          })
        }
      />
      <SelectA
        setSelectedItem={(str) =>
          setOrganisationData({
            ...organisationData,
            legalForm: str,
          })
        }
        title="Forma organizatorico-juridică: "
        items={legalForms}
      />
      <ImageFileInputA
        base64ImageLoadedHandler={(base64Image) => {
          setOrganisationData({
            ...organisationData,
            base64Image,
          })
        }}
        labelName="Logo organizație: "
      />

      <ButtonA type="submit" title="Salvează" />
    </Fragment>
  )

  content = message ? (
    props.isErrorMessage ? (
      <ErrorAlert onOkClick={props.clearMessage} text={message} />
    ) : (
      <SuccessAlert onOkClick={props.onSuccess} text={message} />
    )
  ) : (
    content
  )

  return (
    <FormCardA onSubmit={onSubmit}>
      <h1>Creare organizație: </h1>
      {content}
    </FormCardA>
  )
}
