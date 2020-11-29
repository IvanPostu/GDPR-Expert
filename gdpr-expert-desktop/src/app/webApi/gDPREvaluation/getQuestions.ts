import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type QuestionResponse = {
  categoryId: number
  id: number
  text: string
}

export type GetQuestionsResponseType = {
  categories: Array<string>
  questions: Array<QuestionResponse>
}

export async function getQuestions(): Promise<GetQuestionsResponseType | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/gdpr/evaluation`, options)
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
