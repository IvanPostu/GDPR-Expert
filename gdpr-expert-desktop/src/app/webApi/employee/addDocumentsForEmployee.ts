import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type AddDocumentsForEmployeeDataType = {
  employeeId: number
  documents: Array<File>
}

export async function addDocumentsForEmployee(
  data: AddDocumentsForEmployeeDataType,
): Promise<void | UnsuccessResponseData> {
  let status = 0

  try {
    const formData = new FormData()

    for (const file of data.documents) {
      formData.append('files', file)
    }
    formData.append('employeeId', String(data.employeeId))

    const options: RequestInit = {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }

    const response = await fetch(`${webServerURL}/api/employee/docs`, options)
    status = response.status

    if (status !== 201) throw 0
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
