import { GlobalStateType } from '@/app/store'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { OrganisationsPageView } from './OrganisationsPageView'
import {
  reloadOrganisationsPageActionCreator,
  fetchOrganisationsActionCreator,
} from '@/app/store/Organisations/actionCreators'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisationsIsLoadProcess: state.organisationsReducer.isLoadProcess,
    isLoadedFirstTime: state.organisationsReducer.isLoadedFirstTime,
    organisations: state.organisationsReducer.organisations,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = { reloadOrganisationsPageActionCreator, fetchOrganisationsActionCreator }
  return bindActionCreators(actionCreators, dispatch)
}

type OrganisationsPageComponentPropType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

class OrganisationsPageComponent extends Component<OrganisationsPageComponentPropType> {
  constructor(props: OrganisationsPageComponentPropType) {
    super(props)
  }

  componentDidMount(): void {
    if (!this.props.isLoadedFirstTime && !this.props.organisationsIsLoadProcess) {
      this.props.fetchOrganisationsActionCreator()
    }
  }

  render(): ReactElement {
    return (
      <OrganisationsPageView
        onRefreshClick={this.props.reloadOrganisationsPageActionCreator}
        organisations={this.props.organisations}
        isLoad={this.props.organisationsIsLoadProcess}
      />
    )
  }
}

export const OrganisationsPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganisationsPageComponent)
