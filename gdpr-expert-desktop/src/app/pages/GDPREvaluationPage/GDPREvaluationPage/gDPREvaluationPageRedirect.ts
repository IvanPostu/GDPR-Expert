import { routeNames } from '@/app/routes/routeNames'
import { History } from 'history'

type ArgsType = {
  history: History
}

export function gDPREvaluationPageRedirect({ history }: ArgsType): void {
  history.push(routeNames.GDPREvaluationPageRoute)
}
