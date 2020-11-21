import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type GetEmployeeResponse = {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  employeeId: number
  personalDataResponsible: boolean
  email: string
  departmentName: string
  departmentId: number
}

export async function getEmployeeById(
  employeeId: number,
): Promise<GetEmployeeResponse | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/employee/${employeeId}`, options)
    status = response.status

    if (response.status === 200 && response.ok) {
      const employeeData = await response.json()
      return employeeData
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
