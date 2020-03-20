import { createStore, applyMiddleware } from 'redux'
// import { logger } from 'redux-logger'
import { rootReducer } from '../reducers'
import createSagaMiddleware from 'redux-saga'

import * as sagas from '../sagas/logOnSagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
// const store = createStore(rootReducer, applyMiddleware(logger))

sagaMiddleware.run(sagas.mainWatchSaga)

export default store


