import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type CreateDataProcessingActivityRequestDataType = {
  organisationId: number
  dataResponsibleEmployeeId: number
  departmentId: number
  dataIsSensible: boolean
  activityName: string
  dataOwner: string
  beginningOfTheActivity: string
  endOfTheActivity: string
  description: string
  purposes: string
  status: string
}

export async function createDataProcessingActivity(
  data: CreateDataProcessingActivityRequestDataType,
): Promise<number | UnsuccessResponseData> {
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
    const response = await fetch(`${webServerURL}/api/dataProcessingActivity`, options)
    status = response.status

    if (status !== 201) throw 0

    const newDataProcessingActivityId = await response.text()

    return Number(newDataProcessingActivityId)
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
