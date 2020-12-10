import { PageableType } from '@/app/webApi/PageableType'
import {
  getPersonalInfoRequest,
  GetPersonalInfoRequestItemType,
} from '@/app/webApi/personalInfoRequest/getPersonalInfoRequest'
import { UnsuccessResponseData } from '@/app/webApi/UnsuccessResponseData'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators, Dispatch } from 'redux'
import { RequestsForPersonalInfoView } from './RequestsForPersonalInfoView'
import { clearAuthDataActionCreator } from '@/app/store/Authentication/actionCreators'

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
    const res = await getPersonalInfoRequest({ page: this.state.pageNumber })
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

  render(): ReactElement {
    return (
      <RequestsForPersonalInfoView
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
