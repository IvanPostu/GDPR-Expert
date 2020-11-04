import React, { ReactElement, FC } from 'react'
import { Redirect } from 'react-router-dom'
import { routeNames } from '@/app/routes/routeNames'
import { GlobalStateType } from '@/app/store'

function mapStateToProps(state: GlobalStateType) {
  return {
    isAuthenticated: state.authenticationReducer.isAuthenticated,
  }
}

type RootPagePropType = ReturnType<typeof mapStateToProps>

export const RootPage: FC<RootPagePropType> = (props): ReactElement => {
  const isAuthenticated = props.isAuthenticated

  if (!isAuthenticated) {
    return <Redirect to={routeNames.LoginPageRoute} />
  } else {
    return <Redirect to={routeNames.OrganisationsPageRoute} />
  }
}
