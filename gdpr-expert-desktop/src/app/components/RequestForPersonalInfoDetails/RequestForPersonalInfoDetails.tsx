import {
  getPersonalInfoDetailsRequest,
  GetPersonalInfoDetailsRequestResponseType,
} from '@/app/webApi/personalInfoRequest/getPersonalInfoRequestDetails'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import RequestForPersonalInfoDetailsView from './RequestForPersonalInfoDetailsView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type RequestForPersonalInfoDetailsComponentPropType = RouteComponentProps & {
  requestForPersonalInfoId: number
} & ReturnType<typeof mapDispatchToProps>

type RequestForPersonalInfoDetailsComponentStateType = {
  isLoad: boolean
  requestForPersonalInfoDetails: GetPersonalInfoDetailsRequestResponseType | null
}

const RequestForPersonalInfoDetailsComponent = (
  props: RequestForPersonalInfoDetailsComponentPropType,
): ReactElement => {
  const [state, setState] = useState<RequestForPersonalInfoDetailsComponentStateType>({
    isLoad: true,
    requestForPersonalInfoDetails: null,
  })

  const isMounted = useRef(false)

  const fetchDetails = async function () {
    const res = await getPersonalInfoDetailsRequest({
      personalInfoRequestId: props.requestForPersonalInfoId,
    })

    if (!isMounted.current) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as GetPersonalInfoDetailsRequestResponseType
      setState({ ...state, requestForPersonalInfoDetails: data, isLoad: false })
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        props.clearAuthDataActionCreator()
      }
    }
  }

  useEffect(() => {
    isMounted.current = true
    fetchDetails()
    return () => {
      isMounted.current = false
    }
  }, [])

  if (state.requestForPersonalInfoDetails === null) {
    return <RequestForPersonalInfoDetailsView isLoad={state.isLoad} items={{}} />
  } else {
    const details = state.requestForPersonalInfoDetails as GetPersonalInfoDetailsRequestResponseType
    const data: { [key: string]: string } = {
      'Numele persoanei:': details.firstName,
      'Prenumele persoanei:': details.lastName,
      'Dreptul solicitat:': details.requestedRight,
      'Email:': details.email,
      'Numărul de telefon:': details.phone,
      'Comentariul persoanei anexat la cerere:': details.comment,
      'Denumirea organizației ce procesează datele persoanei:': details.organisationName,
      'Statutul cererii:': details.processed ? 'Finalizat' : 'În așteptare',
    }

    return <RequestForPersonalInfoDetailsView isLoad={state.isLoad} items={data} />
  }
}

export const RequestForPersonalInfoDetails = connect(
  null,
  mapDispatchToProps,
)(RequestForPersonalInfoDetailsComponent)
