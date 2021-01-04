import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type DepartmentResponseType = {
  departmentName: string
  departmentResponsiblePerson: string
  departmentCreatedAt: string
  departmentId: number
  departmentEmail: string
  departmentPhoneNumber: string
}

export async function getDepartment(
  departmentId: number,
): Promise<DepartmentResponseType | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/department/${departmentId}`, options)

    status = response.status

    if (response.status === 200 && response.ok) {
      const department = await response.json()
      return department
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
