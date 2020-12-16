import { saveDPIA } from '@/app/webApi/dPIAEvaluation/saveDPIAData'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement, SyntheticEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { FullWidthLoader } from '../BasicLoader'
import DPIAEvaluationView from './DPIAEvaluationView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { connect } from 'react-redux'
import { MessageBoxWrapper, MessageBoxWrapperPropType } from '../MessageBoxWrapper'

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ clearAuthDataActionCreator }, dispatch)
}

export type DPIADataType = {
  stageOneDataDetails: string
  stageTwoCurrentSetOfMeasures: string
  stageThreeSourcesOfRisk: string
  stageFourPotentialAdverseEventsAndThreats: string
  stageFiveSummaryAnalysisAndCurrentControls: string
}

interface DPIAEvaluationStateType {
  DPIA: DPIADataType
  isLoad: boolean
  msg: MessageBoxWrapperPropType
}
type DPIAEvaluationPropType = RouteComponentProps & {
  dataProcessingActivityId: number
} & ReturnType<typeof mapDispatchToProps>

class DPIAEvaluationComponent extends Component<DPIAEvaluationPropType, DPIAEvaluationStateType> {
  private _isMounted = false

  constructor(props: DPIAEvaluationPropType) {
    super(props)

    this.state = {
      isLoad: false,
      msg: {
        message: '',
        onOkClick: alert,
        type: 'error',
      },
      DPIA: {
        stageOneDataDetails: '',
        stageThreeSourcesOfRisk: '',
        stageTwoCurrentSetOfMeasures: '',
        stageFourPotentialAdverseEventsAndThreats: '',
        stageFiveSummaryAnalysisAndCurrentControls: '',
      },
    }

    this.setDPIAData = this.setDPIAData.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.fetchSaveEvaluation = this.fetchSaveEvaluation.bind(this)
    this.onSuccessSave = this.onSuccessSave.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  setDPIAData(data: DPIADataType): void {
    this.setState({
      DPIA: data,
    })
  }

  async fetchSaveEvaluation(): Promise<void> {
    this.setState({ isLoad: true })
    const res = await saveDPIA({
      dataProcessingActivityId: this.props.dataProcessingActivityId,
      ...this.state.DPIA,
    })

    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      // console.log(this.state.DPIA)
      this.setState({
        isLoad: false,
        msg: {
          message:
            'Realizarea evaluării a impactului privind protecția datelor conform R.G.P.D. a avut loc cu succes.',
          onOkClick: this.onSuccessSave,
          type: 'success',
        },
      })
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        this.props.clearAuthDataActionCreator()
        return
      }

      this.setState({ isLoad: false })
      alert('A aparut o eroare!!!')
    }
  }

  onSubmit(e: SyntheticEvent): void {
    e.preventDefault()
    this.fetchSaveEvaluation()
  }

  onSuccessSave(): void {
    this.props.history.goBack()
  }

  render(): ReactElement {
    if (this.state.isLoad) return <FullWidthLoader />
    return (
      <MessageBoxWrapper {...this.state.msg}>
        <DPIAEvaluationView
          onSubmit={this.onSubmit}
          DPIA={this.state.DPIA}
          setDPIAData={this.setDPIAData}
        />
      </MessageBoxWrapper>
    )
  }
}

export const DPIAEvaluation = connect(null, mapDispatchToProps)(DPIAEvaluationComponent)
