import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type GetPersonalInfoRequestPropType = {
  personalInfoRequestId: number
}

export type GetPersonalInfoDetailsRequestResponseType = {
  personalInfoRequestId: number
  organisationId: number
  organisationName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  requestedRight: string
  comment: string
  requestedAt: string
  processed: boolean
}

export async function getPersonalInfoDetailsRequest(
  props: GetPersonalInfoRequestPropType,
): Promise<GetPersonalInfoDetailsRequestResponseType | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }
  let status = 0

  try {
    const url = `${webServerURL}/api/personalDataRequests/${props.personalInfoRequestId}`
    const response = await fetch(url, options)
    status = response.status

    if (response.status === 200 && response.ok) {
      const personalInfoRequests = await response.json()

      return personalInfoRequests
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
