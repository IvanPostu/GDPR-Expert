import { routeNames } from '@/app/routes/routeNames'
import { History } from 'history'

export function employeeInfoPageRedirect(data: { history: History; employeeId: number }): void {
  const { employeeId, history } = data
  const searchValue = `?employeeId=${employeeId}`

  history.push({
    pathname: routeNames.EmployeeInfoPageRoute,
    search: searchValue,
  })
}
