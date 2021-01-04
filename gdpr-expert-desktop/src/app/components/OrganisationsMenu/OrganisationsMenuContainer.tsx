import { GlobalStateType } from '@/app/store'
import React, { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import {
  reloadOrganisationsPageActionCreator,
  fetchOrganisationsActionCreator,
  setOrganisationsDataActionCreator,
} from '@/app/store/Organisations/actionCreators'
import { OrganisationsMenuView } from './OrganisationsMenuView'
import { RouteComponentProps } from 'react-router-dom'

function mapStateToProps(state: GlobalStateType) {
  return {
    organisationsIsLoadProcess: state.organisationsReducer.isLoadProcess,
    organisations: state.organisationsReducer.organisations,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators = {
    reloadOrganisationsPageActionCreator,
    fetchOrganisationsActionCreator,
    setOrganisationsDataActionCreator,
  }
  return bindActionCreators(actionCreators, dispatch)
}

type OrganisationsMenuContainerPropType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps

class OrganisationsMenuContainerComponent extends Component<OrganisationsMenuContainerPropType> {
  constructor(props: OrganisationsMenuContainerPropType) {
    super(props)
  }

  componentDidMount(): void {
    if (!this.props.organisationsIsLoadProcess) {
      this.props.setOrganisationsDataActionCreator([])
      this.props.fetchOrganisationsActionCreator()
    }
  }

  render(): ReactElement {
    return (
      <OrganisationsMenuView
        onRefreshClick={this.props.reloadOrganisationsPageActionCreator}
        organisations={this.props.organisations}
        isLoad={this.props.organisationsIsLoadProcess}
      />
    )
  }
}

export const OrganisationsMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganisationsMenuContainerComponent)
