import { routeNames } from '@/app/routes/routeNames'
import { History } from 'history'

export function employeeAddDocumentsPageRedirect(data: {
  history: History
  employeeId: number
  employeeFirstName: string
  employeeLastName: string
}): void {
  const { employeeFirstName, employeeId, employeeLastName, history } = data

  const searchValue = `?employeeId=${employeeId}&employeeLastName=${employeeLastName}&employeeFirstName=${employeeFirstName}`

  history.push({
    pathname: routeNames.EmployeeAddDocumentsPageRoute,
    search: searchValue,
  })
}
