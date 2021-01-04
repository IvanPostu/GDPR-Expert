import { webServerURL } from '@/constants/webServerUrl'

export async function loginUser(email: string, password: string): Promise<boolean> {
  const data = new URLSearchParams()
  data.append('username', email)
  data.append('password', password)

  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  }

  try {
    const response = await fetch(`${webServerURL}/login`, options)
    const responseData = await response.text()
    const result: boolean = responseData === 'login_success' && response.ok
    return result
  } catch (e) {
    return false
  }
}
