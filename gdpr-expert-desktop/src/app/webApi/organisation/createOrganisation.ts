import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type CreateOrganisationDataTypeForWebApi = {
  organisationName: string
  address: string
  email: string
  telephone: string
  legalRepresentative: string
  legalForm: string
  description: string
  base64LogoImage: string
  foundedAt: string //"foundedAt": "2000-11-22"
}

export async function createOrganisation(
  data: CreateOrganisationDataTypeForWebApi,
): Promise<boolean | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/organisation/create`, options)
    status = response.status

    if (response.status !== 201) throw new Error()

    return true
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
