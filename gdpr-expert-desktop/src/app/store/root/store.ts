import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { updateDownloadItemActionCreator } from '../Downloads/actionCreators'
import {
  downloadStatusListener,
  DownloadStatusListenerPropType,
} from '@/app/rendererCallbacks/downloadStatusListener'
// import { Progress } from 'electron-dl'

const sagaMiddleware = createSagaMiddleware()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export function configureStore() {
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

downloadStatusListener((data: DownloadStatusListenerPropType) =>
  store.dispatch(updateDownloadItemActionCreator(data)),
)

// return store
// }

// export type GlobalStoreType = ReturnType<typeof configureStore>
