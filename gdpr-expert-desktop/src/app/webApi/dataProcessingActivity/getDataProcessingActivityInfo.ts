import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type DataProcessingActivityInfoResponseType = {
  organisationId: number
  organisationName: string
  activityId: number
  activityName: string
  departmentName: string
  departmentId: number
  dataResponsibleEmployeeId: number
  dataProcessingResponsibleEmployeeFullname: string
  dataIsSensible: true
  dataOwner: string
  beginningOfTheActivity: string
  endOfTheActivity: string
  description: string
  purposes: string
  status: string
}

export async function getDataProcessingActivityInfo(
  activityId: number,
): Promise<DataProcessingActivityInfoResponseType | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const url = `${webServerURL}/api/dataProcessingActivity/info/${activityId}`
    const response = await fetch(url, options)

    status = response.status

    if (response.status === 200 && response.ok) {
      const data = (await response.json()) as Promise<DataProcessingActivityInfoResponseType>
      return data
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
