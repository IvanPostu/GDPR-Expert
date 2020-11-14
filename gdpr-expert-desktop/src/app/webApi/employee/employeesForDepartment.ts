import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type EmployeeForDepartmentResponseType = {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  id: number
  pesonalDataResponsible: boolean
  email: string
}
/**
 *
 * @param data : CreateEmployeeRequestDataType
 * @return auth_error
 *
 */
export async function employeesForDepartment(
  departmentId: number,
): Promise<Array<EmployeeForDepartmentResponseType> | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/employee/department/${departmentId}`, options)
    status = response.status
    const data = await response.json()

    return data as Array<EmployeeForDepartmentResponseType>
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
