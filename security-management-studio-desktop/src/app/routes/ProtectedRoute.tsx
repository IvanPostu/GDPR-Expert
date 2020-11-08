// import React, { Component, FC, ReactElement } from 'react'
// import { Route } from 'react-router-dom'

// type ProtectedRoutePropType = {
//   component: Component
//   logged: boolean
//   rest: unknown
// }

// export const ProtectedRoute: FC<ProtectedRoutePropType> = ({
//   component,
//   logged,
//   ...rest
// }): ReactElement => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (logged) {
//           return component
//         } else {
//           return <div />
//         }
//       }}
//     />
//   )
// }
