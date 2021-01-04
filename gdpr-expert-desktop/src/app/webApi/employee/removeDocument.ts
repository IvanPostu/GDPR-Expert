import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type RemoveDocumentsForEmployeeDataType = {
  documentId: number
}

export async function removeDocumentsForEmployee(
  data: RemoveDocumentsForEmployeeDataType,
): Promise<number | UnsuccessResponseData> {
  let status = 0
  const options: RequestInit = {
    method: 'DELETE',
    credentials: 'include',
    headers: {},
  }

  try {
    const response = await fetch(`${webServerURL}/api/employee/docs/${data.documentId}`, options)
    status = response.status
    if (status !== 200) throw 0
    return 1
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
