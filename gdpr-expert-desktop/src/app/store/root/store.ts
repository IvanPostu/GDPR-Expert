import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { updateDownloadItemActionCreator } from '../Downloads/actionCreators'
import {
  downloadStatusListener,
  DownloadStatusListenerPropType,
  downloadStartListener,
} from '@/app/rendererCallbacks/downloadStatusListener'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

downloadStatusListener((data: DownloadStatusListenerPropType) => {
  store.dispatch(updateDownloadItemActionCreator(data))
})

downloadStartListener((data: DownloadStatusListenerPropType) => {
  store.dispatch(updateDownloadItemActionCreator(data))
})
