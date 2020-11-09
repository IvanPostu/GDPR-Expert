import { webServerURL } from '@/constants'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type ResponseType = {
  organisationId: string
  organisationAddress: string
  organisationCreatedOnPlatformDateTime: string
  organisationEmail: string
  organisationDepartmentCount: string
  organisationDescription: string
  organisationEmployeeCount: string
  organisationName: string
  organisationLogo: string
  organisationFoundedDate: string
  organisationLegalForm: string
  organisationAdministrator: string
  organisationPhoneNumber: string
}

export async function getOrganisationById(
  organisationId: number,
): Promise<ResponseType | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/organisation/info/${organisationId}`, options)

    status = response.status

    if (response.status === 200 && response.ok) {
      const organisation = await response.json()
      return organisation as ResponseType
    }

    throw new Error()
  } catch (e) {
    const error = new UnsuccessResponseData(status ? status : 404, [])
    throw error as UnsuccessResponseData
  }
}
