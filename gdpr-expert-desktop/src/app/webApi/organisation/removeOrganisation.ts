import { webServerURL } from '@/app/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

export async function removeOrganisation(
  organisationId: number,
): Promise<boolean | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'DELETE',
    credentials: 'include',
  }

  let status = 0

  try {
    const response = await fetch(
      `${webServerURL}/api/organisation/delete/${organisationId}`,
      options,
    )
    status = response.status
    if (status === 200) {
      return true
    } else {
      throw 1
    }
  } catch (e) {
    return new UnsuccessResponseData(status, {})
  }
}
