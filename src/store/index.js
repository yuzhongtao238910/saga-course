import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import createSagaMiddleware from '../redux-saga'
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()

const store = applyMiddleware(sagaMiddleware)(createStore)(reducer)
sagaMiddleware.run(rootSaga)
export default store
