import { routeNames } from '@/app/routes/routeNames'
import { History } from 'history'

export function severityEvaluationOfPersonalDataPageRedirect(data: {
  history: History
  dataProcessingActivityId: number
}): void {
  const { dataProcessingActivityId, history } = data
  const searchValue = `?dataProcessingActivityId=${dataProcessingActivityId}`

  history.push({
    pathname: routeNames.SeverityEvaluationOfPersonalDataPageRoute,
    search: searchValue,
  })
}
