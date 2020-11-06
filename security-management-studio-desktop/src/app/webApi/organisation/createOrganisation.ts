import { webServerURL } from '@/constants'
import { CreateOrganisationDataTypeForWebApi } from './types'

export async function createOrganisation(
  data: CreateOrganisationDataTypeForWebApi,
  on401StatusCallback: () => void,
): Promise<boolean> {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(`${webServerURL}/api/organisation/create`, options)
    if (response.status === 401) {
      on401StatusCallback()
    }

    return response.status === 201
  } catch (e) {
    return false
  }
}
