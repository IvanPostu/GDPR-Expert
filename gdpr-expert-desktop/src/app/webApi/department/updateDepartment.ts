import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type UpdateDepartmentRequestDataType = {
  id: number
  responsiblePerson: string
  name: string
  phoneNumber: string
  email: string
}

export async function updateDepartment(
  data: UpdateDepartmentRequestDataType,
): Promise<number | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/department`, options)
    status = response.status

    if (status !== 201) throw 0

    const newDepartmentId = await response.text()

    return Number(newDepartmentId)
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
