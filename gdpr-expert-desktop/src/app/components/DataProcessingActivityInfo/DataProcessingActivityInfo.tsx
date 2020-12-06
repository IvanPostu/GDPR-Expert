import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { DataProcessingActivityInfoView } from './DataProcessingActivityInfoView'
import {
  DataProcessingActivityInfoResponseType,
  getDataProcessingActivityInfo,
} from '@/app/webApi/dataProcessingActivity/getDataProcessingActivityInfo'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'

const mapDispatchToProps = (dispatch: Dispatch) => {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type DataProcessingActivityInfoComponentPropType = {
  activityId: number
} & RouteComponentProps &
  ReturnType<typeof mapDispatchToProps>

type DataProcessingActivityInfoComponentStateType = {
  activity: DataProcessingActivityInfoResponseType
  isLoading: boolean
}

class DataProcessingActivityInfoComponent extends Component<
  DataProcessingActivityInfoComponentPropType,
  DataProcessingActivityInfoComponentStateType
> {
  _isMounted = false

  constructor(props: DataProcessingActivityInfoComponentPropType) {
    super(props)

    this.state = {
      isLoading: true,
      activity: {
        activityId: 0,
        activityName: '',
        beginningOfTheActivity: '',
        dataIsSensible: true,
        dataOwner: '',
        dataProcessingResponsibleEmployeeFullname: '',
        dataResponsibleEmployeeId: 0,
        departmentId: 0,
        departmentName: '',
        description: '',
        endOfTheActivity: '',
        organisationId: 0,
        organisationName: '',
        purposes: '',
        status: '',
      },
    }

    this.fetchDataProcessingActivityInfo = this.fetchDataProcessingActivityInfo.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
    this.fetchDataProcessingActivityInfo()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  async fetchDataProcessingActivityInfo(): Promise<void> {
    const res = await getDataProcessingActivityInfo(this.props.activityId)
    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as DataProcessingActivityInfoResponseType
      this.setState({ isLoading: false, activity: data })
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        this.props.clearAuthDataActionCreator()
      }
    }
  }

  render(): ReactElement {
    return <DataProcessingActivityInfoView activityData={this.state.activity} />
  }
}

export const DataProcessingActivityInfo = connect(
  null,
  mapDispatchToProps,
)(DataProcessingActivityInfoComponent)
