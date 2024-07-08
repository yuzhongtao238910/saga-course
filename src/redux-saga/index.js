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
			// next 约等于 原生的store.dispatch
			return function (action) {
				// next 表示调用下一次中间件，我这个地方我只是想知道派发了哪些动作，并不像拦截原来的派发逻辑
				// 这个方法就是派发动作的方法
				const result = next(action)
				// 发射一个事件  事件的类型的是actyion.type
				channel.emit(action.type, action)
				return result
			}
		}
	}
	sagaMiddleware.run = (saga) => boundRunSaga(saga)
	return sagaMiddleware
}
export default createSagaMiddleware
