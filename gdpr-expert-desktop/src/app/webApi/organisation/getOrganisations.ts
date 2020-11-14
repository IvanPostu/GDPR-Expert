import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type OrganisationResponseTypeA = {
  organisationDescription: string
  organisationName: string
  organisationLogo: string
  organisationId: string
  organisationCreatedOnPlatformDateTime: string
  organisationFoundedDate: string
}

export async function getOrganisations(): Promise<
  Array<OrganisationResponseTypeA> | UnsuccessResponseData
> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/organisation/all`, options)
    status = response.status

    if (response.status === 200 && response.ok) {
      const organisations = await response.json()
      return organisations
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
