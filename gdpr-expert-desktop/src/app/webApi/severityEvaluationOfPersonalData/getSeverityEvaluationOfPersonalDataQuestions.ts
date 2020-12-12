import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type GetSeverityEvaluationOfPersonalDataQuestionsResponseType = {
  title: string
  evaluation: {
    [key: string]: {
      id: number
      title: string
      description: string
      variants: Array<string>
      Cost: Array<number>
    }
  }
  evaluationInfo: {
    formula: string //CPD*UI+CC
    SClt4: {
      impactOnAffectedDataSubjects: string
      possibleConsequencesForDataSubjects: Array<string>
    }
    SCe4: {
      impactOnAffectedDataSubjects: string
      possibleConsequencesForDataSubjects: Array<string>
    }
    SCgt4: {
      impactOnAffectedDataSubjects: string
      possibleConsequencesForDataSubjects: Array<string>
    }
  }
}

export async function getSeverityEvaluationOfPersonalDataQuestions(): Promise<
  GetSeverityEvaluationOfPersonalDataQuestionsResponseType | UnsuccessResponseData
> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const url = `${webServerURL}/api/severityEvaluatingOfPersonalData/questions`
    const response = await fetch(url, options)
    status = response.status

    if (response.status === 200 && response.ok) {
      const questions = await response.json()
      return questions
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
