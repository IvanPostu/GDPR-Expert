import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

// export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function configureStore() {
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./rootReducer', () => {
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
  //     const nextRootReducer = require('./rootReducer')
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  const a = 'a'
  return store
}
