import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type GetDataResponsibleQuestionsResponse = {
  id: number
  content: string
  variants: Array<string>
  variantsId: Array<number>
  keyword: string
}

export async function getDataResponsibleQuestions(): Promise<
  Array<GetDataResponsibleQuestionsResponse> | UnsuccessResponseData
> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/employee/dataResponsibleQuestions`, options)
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
