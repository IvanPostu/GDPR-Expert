import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export async function deleteDepartment(
  departmentId: number,
): Promise<number | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let status = 0

  try {
    const response = await fetch(`${webServerURL}/api/department/${departmentId}`, options)
    status = response.status

    if (status !== 200) throw 0

    const deletedDepartmentID = await response.text()

    return Number(deletedDepartmentID)
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
