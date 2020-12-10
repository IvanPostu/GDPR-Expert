import { routeNames } from '@/app/routes/routeNames'
import { History } from 'history'

export function requestsForPersonalInfoDetailsPageRedirect(data: {
  history: History
  requestForPersonalInfoId: number
}): void {
  const { requestForPersonalInfoId, history } = data
  const searchValue = `?requestForPersonalInfoId=${requestForPersonalInfoId}`

  history.push({
    pathname: routeNames.RequestsForPersonalInfoDetailsPageRoute,
    search: searchValue,
  })
}
