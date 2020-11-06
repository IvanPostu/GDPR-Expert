import { BasicLoader } from '@/app/components/BasicLoader'
import { ButtonA } from '@/app/components/Form/ButtonA'
import { FormCardA } from '@/app/components/Form/FormCardA'
import { TextInputA, TextAreaA } from '@/app/components/Form/TextInputA'
import React, { Fragment, ReactElement, SyntheticEvent, useCallback, useState } from 'react'

type OrganisationDataType = {
  orgName: string
  address: string
  email: string
  telephone: string
  legalRepresentative: string
  description: string
}

export const CreateOrganisationPageView = (): ReactElement => {
  const isLoading = false

  const [organisationData, setOrganisationData] = useState<OrganisationDataType>({
    orgName: '',
    address: '',
    email: '',
    telephone: '',
    legalRepresentative: '',
    description: '',
  })

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
    },
    [organisationData],
  )

  const content = isLoading ? (
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
            orgName: str,
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
        labelName="Descriere organizație:"
        onTextChange={(str: string) =>
          setOrganisationData({
            ...organisationData,
            description: str,
          })
        }
      />
      <ButtonA type="submit" title="Salvează" />
    </Fragment>
  )

  return (
    <FormCardA onSubmit={onSubmit}>
      <h1>Creare organizație: </h1>
      {content}
    </FormCardA>
  )
}
