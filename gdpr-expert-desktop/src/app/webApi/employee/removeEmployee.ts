import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

/**
 *
 * @param employeeId On success return removed employee id
 */
export async function removeEmployeeById(
  employeeId: number,
): Promise<number | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'DELETE',
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
