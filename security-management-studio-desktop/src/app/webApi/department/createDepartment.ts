import { webServerURL } from '@/constants'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type CreateDepartmentRequestDataType = {
  responsiblePerson: string
  name: string
  phoneNumber: string
  email: string
  organisationId: number
}

/**
 *
 * @param data : CreateDepartmentRequestDataType
 * @return auth_error
 *
 */
export async function createDepartment(
  data: CreateDepartmentRequestDataType,
): Promise<number | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/department/create`, options)
    status = response.status

    if (status !== 201) throw 0

    const newDepartmentId = await response.text()

    return Number(newDepartmentId)
  } catch (e) {
    const err = new UnsuccessResponseData(status, [])
    return err
  }
}
