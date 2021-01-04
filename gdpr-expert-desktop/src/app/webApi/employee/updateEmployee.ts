import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type UpdateEmployeeRequestDataType = {
  id: number
  personalDataResponsible: boolean
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}
/**
 *
 * @param data : CreateEmployeeRequestDataType
 * @return id
 *
 */
export async function updateEmployee(
  data: UpdateEmployeeRequestDataType,
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
    const response = await fetch(`${webServerURL}/api/employee`, options)
    status = response.status

    if (status !== 201) throw 0

    const newEmployeeId = await response.text()

    return Number(newEmployeeId)
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
