import { webServerURL } from '@/constants'

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
    const redirectPath = new URL(response.url).pathname
    const authResponse = await fetch(`${webServerURL}${redirectPath}`, { method: 'GET' })
    const loginState = await authResponse.json()

    const result: boolean = loginState['login_current_status'] === 'login_success'
    return result
  } catch (e) {
    return false
  }
}
