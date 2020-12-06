import { GlobalStateType } from '@/app/store'
import {
  DataProcessingActivityItemResponseType,
  getDataProcessingActivityItems,
} from '@/app/webApi/dataProcessingActivity/getDataProcessingActivityItems'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { FullWidthLoader } from '../BasicLoader'
import { ProcessingActivitiesView } from './ProcessingActivitiesView'
import { ProcessingActivitiesTableItemsType } from './types'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisationName: state.organisationInfoReducer.organisation.organisationName,
    organisationId: state.organisationInfoReducer.organisation.organisationId,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type ProcessingActivitiesComponentPropType = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type ProcessingActivitiesComponentStateType = {
  dataProcessingActivityItems: Array<ProcessingActivitiesTableItemsType>
  isLoading: boolean
}

class ProcessingActivitiesComponent extends Component<
  ProcessingActivitiesComponentPropType,
  ProcessingActivitiesComponentStateType
> {
  private _isMounted = false

  constructor(props: ProcessingActivitiesComponentPropType) {
    super(props)

    this.state = {
      isLoading: true,
      dataProcessingActivityItems: [],
    }

    this.fetchDataProcessingActivities = this.fetchDataProcessingActivities.bind(this)
    this.onRefreshClick = this.onRefreshClick.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
    this.fetchDataProcessingActivities()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  async fetchDataProcessingActivities(): Promise<void> {
    const res = await getDataProcessingActivityItems(Number(this.props.organisationId))

    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as Array<DataProcessingActivityItemResponseType>
      const newDataProcessingActivityItems: Array<ProcessingActivitiesTableItemsType> = data.map(
        (a) => ({
          id: String(a.activityId),
          name: a.activityName,
          departmentName: a.departmentName,
          responsiblePersonFullName: a.dataProcessingResponsibleEmployeeFullname,
          dataOwnerPersonFullName: a.dataOwnerFullname,
          purposes: a.processingPurposes,
          status: a.status,
        }),
      )

      this.setState({
        dataProcessingActivityItems: newDataProcessingActivityItems,
      })
    } else {
      if ((res as UnsuccessResponseData).isSessionExpired) {
        this.props.clearAuthDataActionCreator()
      }
    }

    this.setState({ isLoading: false })
  }

  onRefreshClick(): void {
    this.setState({ dataProcessingActivityItems: [], isLoading: true })
    this.fetchDataProcessingActivities()
  }

  render(): ReactElement {
    if (this.state.isLoading) return <FullWidthLoader />

    return (
      <ProcessingActivitiesView
        onRefreshClick={this.onRefreshClick}
        dataProcessingActivities={this.state.dataProcessingActivityItems}
        organisationName={this.props.organisationName}
      />
    )
  }
}

export const ProcessingActivities = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProcessingActivitiesComponent)
