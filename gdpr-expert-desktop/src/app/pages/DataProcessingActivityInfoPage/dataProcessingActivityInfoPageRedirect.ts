import { routeNames } from '@/app/routes/routeNames'
import { History } from 'history'

export function dataProcessingActivityInfoPageRedirect(data: {
  history: History
  activityId: number
}): void {
  const { activityId, history } = data
  const searchValue = `?activityId=${activityId}`

  history.push({
    pathname: routeNames.DataProcessingActivityInfoPageRoute,
    search: searchValue,
  })
}
