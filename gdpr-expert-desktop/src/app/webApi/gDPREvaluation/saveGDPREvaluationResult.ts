import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type GDPREvaluationResultType = {
  organisationId: number
  percentages: number
}

export async function saveGDPREvaluationResult(
  data: GDPREvaluationResultType,
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
    const response = await fetch(`${webServerURL}/api/gdpr/evaluation`, options)
    status = response.status

    if (status !== 201) throw 0

    return Number(1)
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
