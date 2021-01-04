import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type UpdateOrganisationDataTypeForWebApi = {
  id: number
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

export async function updateOrganisation(
  data: UpdateOrganisationDataTypeForWebApi,
): Promise<boolean | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/organisation`, options)
    status = response.status

    if (response.status === 201) {
      return true
    } else {
      throw 1
    }
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
