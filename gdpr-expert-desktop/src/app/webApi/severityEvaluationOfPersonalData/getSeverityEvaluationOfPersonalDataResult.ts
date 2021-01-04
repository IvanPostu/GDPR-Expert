import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type GetSeverityEvaluationOfPersonalDataResultResponseType = {
  evaluationDate: string
  evaluationResult: {
    impactOnAffectedDataSubjects: string
    possibleConsequencesForDataSubjects: string
    notificationObligation: string
  }
}

export async function getSeverityEvaluationOfPersonalDataResponse(
  severityEvaluationResultId: number,
): Promise<GetSeverityEvaluationOfPersonalDataResultResponseType | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const url = `${webServerURL}/api/severityEvaluatingOfPersonalData/${severityEvaluationResultId}`
    const response = await fetch(url, options)
    status = response.status

    if (response.status === 200 && response.ok) {
      const result = await response.json()
      return result
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
