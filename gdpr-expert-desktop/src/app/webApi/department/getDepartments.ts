import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export type DepartmentsResponseType = Array<{
  departmentName: string
  departmentResponsiblePerson: string
  departmentCreatedAt: string
  departmentId: number
  departmentEmail: string
  departmentPhoneNumber: string
}>

export async function getDepartments(
  organisationId: number,
): Promise<DepartmentsResponseType | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {},
  }

  let status = 404

  try {
    const response = await fetch(
      `${webServerURL}/api/department/organisation/${organisationId}`,
      options,
    )

    status = response.status

    if (response.status === 200 && response.ok) {
      const departments = await response.json()
      return departments
    }

    throw new Error()
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
