import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type GDPREvaluationResultType = {
  organisationId: number
  limit?: number
}

export type GDPREvaluationResultResponseType = Array<{
  completedAt: string
  id: number
  percentageEstimation: number
}>

export async function fetchLastGDPREvaluationResults(
  data: GDPREvaluationResultType,
): Promise<GDPREvaluationResultResponseType | UnsuccessResponseData> {
  const organisationId = data.organisationId
  const limit = data.limit || 5

  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
  }

  let status = 0

  try {
    const response = await fetch(
      `${webServerURL}/api/gdpr/evaluation/results?organisationId=${organisationId}&limit=${limit}`,
      options,
    )
    status = response.status

    if (status !== 200) throw 0

    const data = await response.json()
    return data
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
