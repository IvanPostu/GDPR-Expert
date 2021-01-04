import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type SaveSeverityEvaluationfPersonalDataResultRequestType = {
  dataProcessingActivityId: number
  dataProcessingContextGrade: number
  easeOfIdentificationGrade: number
  circumstancesOfCompromiseGrade: number
}

export async function saveSeverityEvaluationfPersonalDataResult(
  props: SaveSeverityEvaluationfPersonalDataResultRequestType,
): Promise<number | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  }

  let status = 0

  try {
    const url = `${webServerURL}/api/severityEvaluatingOfPersonalData`
    const response = await fetch(url, options)
    status = response.status

    if (response.status === 201 && response.ok) {
      return 1
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
