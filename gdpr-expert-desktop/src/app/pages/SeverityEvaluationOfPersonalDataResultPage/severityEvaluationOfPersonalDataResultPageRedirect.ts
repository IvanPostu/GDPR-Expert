import { routeNames } from '@/app/routes/routeNames'
import { History } from 'history'

export function severityEvaluationOfPersonalDataResultPageRedirect(data: {
  history: History
  severityEvaluationOfPersonalDataId: number
}): void {
  const { severityEvaluationOfPersonalDataId, history } = data
  const searchValue = `?severityEvaluationOfPersonalDataId=${severityEvaluationOfPersonalDataId}`

  history.push({
    pathname: routeNames.SeverityEvaluationOfPersonalDataResultPageRoute,
    search: searchValue,
  })
}
