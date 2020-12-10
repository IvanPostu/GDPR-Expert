import { PageableType } from '@/app/webApi/PageableType'
import {
  getPersonalInfoRequests,
  GetPersonalInfoRequestItemType,
} from '@/app/webApi/personalInfoRequest/getPersonalInfoRequests'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { RequestsForPersonalInfoView } from './RequestsForPersonalInfoView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'
import { requestsForPersonalInfoDetailsPageRedirect } from '@/app/pages/RequestsForPersonalInfoDetailsPage/requestsForPersonalInfoDetailsPageRedirect'

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { clearAuthDataActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type RequestsForPersonalInfoComponentPropType = RouteComponentProps &
  ReturnType<typeof mapDispatchToProps>
type RequestsForPersonalInfoComponentStateType = {
  requestsForPersonalInfo: Array<GetPersonalInfoRequestItemType>
  pageNumber: number
  isLoad: boolean
}

class RequestsForPersonalInfoComponent extends Component<
  RequestsForPersonalInfoComponentPropType,
  RequestsForPersonalInfoComponentStateType
> {
  private _isMounted = false
  private _totalPages = 0

  constructor(props: RequestsForPersonalInfoComponentPropType) {
    super(props)

    this.state = {
      isLoad: true,
      pageNumber: 0,
      requestsForPersonalInfo: [],
    }

    this.fetchRequestsForPersonalInfo = this.fetchRequestsForPersonalInfo.bind(this)
    this.onRequestsForPersonalInfoClick = this.onRequestsForPersonalInfoClick.bind(this)
  }

  componentDidMount(): void {
    this._isMounted = true
    this.fetchRequestsForPersonalInfo()
  }

  componentWillUnmount(): void {
    this._isMounted = false
  }

  async fetchRequestsForPersonalInfo(): Promise<void> {
    this.setState({ isLoad: true })
    const res = await getPersonalInfoRequests({ page: this.state.pageNumber })
    if (!this._isMounted) return

    if (!UnsuccessResponseData.isUnsuccessResponseData(res)) {
      const data = res as PageableType<GetPersonalInfoRequestItemType>
      this._totalPages = data.totalPages
      this.setState((prev) => ({
        isLoad: false,
        requestsForPersonalInfo: prev.requestsForPersonalInfo.concat(data.content),
        pageNumber: prev.pageNumber + 1,
      }))
    } else {
      const err = res as UnsuccessResponseData
      if (err.isSessionExpired) {
        this.props.clearAuthDataActionCreator()
      }
    }
  }

  onRequestsForPersonalInfoClick(requestId: number): void {
    requestsForPersonalInfoDetailsPageRedirect({
      history: this.props.history,
      requestForPersonalInfoId: requestId,
    })
  }

  render(): ReactElement {
    return (
      <RequestsForPersonalInfoView
        onTableRowClick={this.onRequestsForPersonalInfoClick}
        onNextItemsClick={this.fetchRequestsForPersonalInfo}
        haveNextItems={this.state.pageNumber < this._totalPages}
        isLoad={this.state.isLoad}
        items={this.state.requestsForPersonalInfo}
      />
    )
  }
}

export const RequestsForPersonalInfo = connect(
  null,
  mapDispatchToProps,
)(RequestsForPersonalInfoComponent)
