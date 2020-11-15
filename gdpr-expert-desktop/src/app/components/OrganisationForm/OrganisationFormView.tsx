import React, { Fragment, FunctionComponent, ReactElement, SyntheticEvent } from 'react'
import { ButtonA } from '../Form/ButtonA'
import { FormCardA } from '../Form/FormCardA'
import { ImageFileInputA } from '../Form/ImageFileInputA'
import { SelectA } from '../Form/SelectA'
import { TextAreaA, TextInputA } from '../Form/TextInputA'
import { legalForms } from './legalForms'
import { OrganisationDataType } from './types'

type OrganisationFormViewPropType = {
  formType: 'update' | 'create'
  organisation: OrganisationDataType
  setStateData: (d: OrganisationDataType, imageChanged?: boolean) => void
  onSubmit: (e: SyntheticEvent) => void
}

export const OrganisationFormView: FunctionComponent<OrganisationFormViewPropType> = (
  props: OrganisationFormViewPropType,
): ReactElement => {
  const title = props.formType === 'create' ? 'Creare organizație: ' : 'Modificare organizație: '

  return (
    <FormCardA onSubmit={props.onSubmit}>
      <h1>{title}</h1>
      <Fragment>
        <TextInputA
          value={props.organisation.organisationName}
          labelname="Denumire organizație:"
          onChange={(e) =>
            props.setStateData({ ...props.organisation, organisationName: e.target.value })
          }
        />
        <TextInputA
          value={props.organisation.address}
          labelname="Adresa juridică:"
          onChange={(e) => props.setStateData({ ...props.organisation, address: e.target.value })}
        />
        <TextInputA
          value={props.organisation.email}
          labelname="Email:"
          onChange={(e) => props.setStateData({ ...props.organisation, email: e.target.value })}
        />
        <TextInputA
          value={props.organisation.telephone}
          labelname="Telefon:"
          onChange={(e) => props.setStateData({ ...props.organisation, telephone: e.target.value })}
        />
        <TextInputA
          value={props.organisation.legalRepresentative}
          labelname="Reprezentant legal:"
          onChange={(e) =>
            props.setStateData({ ...props.organisation, legalRepresentative: e.target.value })
          }
        />
        <TextAreaA
          value={props.organisation.description}
          labelname="Descriere organizație: "
          onChange={(e) =>
            props.setStateData({ ...props.organisation, description: e.target.value })
          }
        />
        <TextInputA
          value={props.organisation.foundedAt}
          type="date"
          labelname="Data fondării:"
          onChange={(e) => props.setStateData({ ...props.organisation, foundedAt: e.target.value })}
        />
        <SelectA
          defaultValue={props.organisation.legalForm}
          setSelectedItem={(str) => props.setStateData({ ...props.organisation, legalForm: str })}
          title="Forma organizatorico-juridică: "
          items={legalForms}
        />
        <ImageFileInputA
          base64Image={props.organisation.base64Image}
          base64ImageLoadedHandler={(base64Image) => {
            props.setStateData({ ...props.organisation, base64Image }, true)
          }}
          labelname="Logo organizație: "
        />

        <ButtonA type="submit" title="Salvează" />
      </Fragment>
    </FormCardA>
  )
}
