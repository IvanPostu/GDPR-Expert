import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type AddDocumentsForEmployeeDataType = {
  employeeId: number
  documents: Array<File>
}

export async function addDocumentsForEmployee(
  data: AddDocumentsForEmployeeDataType,
): Promise<number | UnsuccessResponseData> {
  let status = 0

  try {
    const formData = new FormData()

    for (const file of data.documents) {
      formData.append('files', file)
      formData.append('filenames', file.name)
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
    return 1
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
