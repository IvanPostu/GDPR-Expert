import { webServerURL } from '@/constants/webServerUrl'
import { RegistrationUserType } from './types'

export async function registrateUser(data: RegistrationUserType): Promise<boolean> {
  const requestData: any = {
    email: data.email,
    password: data.password,
  }

  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  }

  try {
    const response = await fetch(`${webServerURL}/api/registration`, options)

    return response.status === 201
  } catch (e) {
    return false
  }
}
