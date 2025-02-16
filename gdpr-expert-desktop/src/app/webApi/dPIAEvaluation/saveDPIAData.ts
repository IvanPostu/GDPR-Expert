import { webServerURL } from '@/constants/webServerUrl'
import { UnsuccessResponseData } from '../UnsuccessResponseData'

type DPIADataRequestType = {
  dataProcessingActivityId: number
  stageOneDataDetails: string
  stageTwoCurrentSetOfMeasures: string
  stageThreeSourcesOfRisk: string
  stageFourPotentialAdverseEventsAndThreats: string
  stageFiveSummaryAnalysisAndCurrentControls: string
}

export async function saveDPIA(data: DPIADataRequestType): Promise<number | UnsuccessResponseData> {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  let status = 0

  try {
    const url = `${webServerURL}/api/dataProtectionImpactAssessment/realize`
    const response = await fetch(url, options)
    status = response.status

    if (status !== 201) throw 0

    return Number(1)
  } catch (e) {
    const err = new UnsuccessResponseData(status, {})
    return err
  }
}
