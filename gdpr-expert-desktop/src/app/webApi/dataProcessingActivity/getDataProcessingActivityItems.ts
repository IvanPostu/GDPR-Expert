import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type DataProcessingActivityItemResponseType = {
  activityId: number
  activityName: string
  organisationName: string
  organisationId: string
  departmentName: string
  departmentId: number
  dataProcessingResponsibleEmployeeFullname: string
  dataOwnerFullname: string
  processingPurposes: string
  status: string
}

export async function getDataProcessingActivityItems(
  organisationId: number,
): Promise<Array<DataProcessingActivityItemResponseType> | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const url = `${webServerURL}/api/dataProcessingActivity?organisationId=${organisationId}`
    const response = await fetch(url, options)

    status = response.status

    if (response.status === 200 && response.ok) {
      const items = (await response.json()) as Promise<
        Array<DataProcessingActivityItemResponseType>
      >
      return items
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
