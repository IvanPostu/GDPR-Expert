import { GlobalStateType } from '@/app/store'
import {
  fetchLastGDPREvaluationResults,
  GDPREvaluationResultResponseType,
} from '@/app/webApi/gDPREvaluation/fetchLastGDPREvaluationResults'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { FullWidthLoader } from '../BasicLoader'
import { GDPREvaluationLayout } from '../GDPREvaluationLayout'
import { GDPRLastEvaluationInfoView } from './GDPRLastEvaluationInfoView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisationId: state.organisationInfoReducer.organisation.organisationId,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type GDPRLastEvaluationInfoComponentPropType = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

type GDPRLastEvaluationInfoComponentStateType = {
  isLoading: boolean
  dates: Array<string>
  percentages: Array<number>
}

class GDPRLastEvaluationInfoComponent extends Component<
  GDPRLastEvaluationInfoComponentPropType,
  GDPRLastEvaluationInfoComponentStateType
> {
  private _isMounted = false

  constructor(props: GDPRLastEvaluationInfoComponentPropType) {
    super(props)
    this.state = {
      isLoading: true,
      dates: [],
      percentages: [],
    }
    this.fetchEvaluationResults = this.fetchEvaluationResults.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
    this.fetchEvaluationResults()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  async fetchEvaluationResults(): Promise<void> {
    const res = await fetchLastGDPREvaluationResults({
      organisationId: Number(this.props.organisationId),
    })

    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as GDPREvaluationResultResponseType
      const percentages = data.map((a) => a.percentageEstimation * 100)
      const dates = data.map((a) => a.completedAt)

      this.setState({ dates, percentages, isLoading: false })
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        this.props.clearAuthDataActionCreator()
      }
    }
  }

  render(): ReactElement {
    if (this.state.isLoading) return <FullWidthLoader />

    return (
      <GDPREvaluationLayout history={this.props.history}>
        <GDPRLastEvaluationInfoView
          dates={this.state.dates}
          percentages={this.state.percentages}
          isEpty={this.state.percentages.length === 0}
        />
      </GDPREvaluationLayout>
    )
  }
}

export const GDPRLastEvaluationInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GDPRLastEvaluationInfoComponent)
