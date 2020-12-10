import { webServerURL } from '@/app/constants/webServerUrl'
import { PageableType } from '../PageableType'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type GetPersonalInfoRequestPropType = {
  page?: number
}

export type GetPersonalInfoRequestItemType = {
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

const DEFAULT_PROP: GetPersonalInfoRequestPropType = {
  page: 0,
}

export async function getPersonalInfoRequest(
  props: GetPersonalInfoRequestPropType = DEFAULT_PROP,
): Promise<PageableType<GetPersonalInfoRequestItemType> | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }
  let status = 0

  try {
    const url = `${webServerURL}/api/personalDataRequests/list?page=${props.page}`
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
