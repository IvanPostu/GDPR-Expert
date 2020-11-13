import { webServerURL } from '@/app/constants/webServerUrl'

export type OrganisationResponseTypeA = {
  organisationDescription: string
  organisationName: string
  organisationLogo: string
  organisationId: string
  organisationCreatedOnPlatformDateTime: string
  organisationFoundedDate: string
}

export async function getOrganisations(): Promise<Array<OrganisationResponseTypeA>> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  try {
    const response = await fetch(`${webServerURL}/api/organisation/all`, options)

    if (response.status === 200 && response.ok) {
      const organisations = await response.json()
      return organisations
    }

    throw new Error()
  } catch (e) {
    return []
  }
}
