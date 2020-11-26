import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type EmployeeDocumentInfoType = {
  documentId: number
  filename: string
}

export async function employeeDocumentsInfo(
  employeeId: number,
): Promise<Array<EmployeeDocumentInfoType> | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/employee/docs/all/${employeeId}`, options)
    status = response.status
    const data = await response.json()

    return data as Array<EmployeeDocumentInfoType>
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
