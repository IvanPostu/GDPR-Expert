import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { updateDownloadItemActionCreator } from '../Downloads/actionCreators'
import { downloadStatusListener } from '@/app/rendererCallbacks/downloadStatusListener'
// import { Progress } from 'electron-dl'

const sagaMiddleware = createSagaMiddleware()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)

  downloadStatusListener((downloadObjectId, percent) =>
    store.dispatch(updateDownloadItemActionCreator(downloadObjectId, percent)),
  )

  return store
}

export type GlobalStoreType = ReturnType<typeof configureStore>
