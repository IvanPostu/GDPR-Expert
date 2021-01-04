import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type CreateEmployeeRequestDataType = {
  departmentId: number
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
 * @return auth_error
 *
 */
export async function addEmployee(
  data: CreateEmployeeRequestDataType,
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
    const response = await fetch(`${webServerURL}/api/employee/add`, options)
    status = response.status

    if (status !== 201) throw 0

    const newDepartmentId = await response.text()

    return Number(newDepartmentId)
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
