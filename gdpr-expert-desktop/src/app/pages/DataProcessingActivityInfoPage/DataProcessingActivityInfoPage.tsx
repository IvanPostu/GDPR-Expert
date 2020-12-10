import { DataProcessingActivityInfo } from '@/app/components/DataProcessingActivityInfo'
import { getUrlParameter } from '@/app/routes/getUrlParameter'
import React, { ReactElement, useRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type DataProcessingActivityInfoPagePropType = RouteComponentProps

/**
 *
 * @URLSearchParam activityId
 */
export function DataProcessingActivityInfoPage(
  props: DataProcessingActivityInfoPagePropType,
): ReactElement {
  const _activityId = useRef(Number(getUrlParameter(props.location.search, 'activityId')))

  return <DataProcessingActivityInfo activityId={_activityId.current} {...props} />
}
