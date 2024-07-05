import EventEmitter from 'events'
import runSaga from './runSaga'
function createSagaMiddleware() {
	const channel = new EventEmitter()
	let boundRunSaga
	function sagaMiddleware({ getState, dispatch }) {
		boundRunSaga = runSaga.bind(null, {
			channel,
			dispatch,
			getState,
		})
		return function (next) {
			return function (action) {
				// 这个方法就是派发动作的方法
				const result = next(action)
				// 发射一个事件  事件的类型的是actyion.type
				channel.emit(actyion.type, action)
				return result
			}
		}
	}
	sagaMiddleware.run = (saga) => boundRunSaga(saga)
	return sagaMiddleware
}
export default createSagaMiddleware
