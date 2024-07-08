import { takeEvery } from 'redux-saga/effects'
import { take, put, fork } from '../../redux-saga/effects'
import * as types from '../action-types.js'
function delay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}
function* workerSaga() {
	// debugger
	yield delay(1000)
	// debugger
	yield put({ type: types.ADD })
}
function* watcherSaga() {
	// 产出一个对应的effect，等待有人向仓库派发一个 ASYNC_ADD 的动作
	// 如果等不到，saga就会暂停在这里，否则就是
	// while (true) {
	// 	yield take(types.ASYNC_ADD) // take只能够监听一次
	// 	yield workerSaga()
	// }
	yield take(types.ASYNC_ADD)
	yield fork(workerSaga)
	console.log('向后走')
}
function* workerSaga1() {
	yield delay(1000)
	yield put({ type: types.ADD })
}
function* watcherSaga1() {
	// 产出一个对应的effect，等待有人向仓库派发一个 ASYNC_ADD 的动作
	// 如果等不到，saga就会暂停在这里，否则就是
	// console.log('saga-1')
	// while (true) {
	// 	yield take(types.ASYNC_MINUS) // take只能够监听一次
	// 	yield workerSaga1()
	// }
	yield take(types.ASYNC_MINUS)
	yield fork(workerSaga1)
}

function* add() {
	yield put({
		type: types.ADD,
	})
}

function* rootSaga() {
	// 不会阻塞当前的saga向后执行 2-永远不会结束，就类似于while true
	yield takeEvery(types.ASYNC_ADD, add)
	console.log('next')
	// console.log('root-saga')
	// yield watcherSaga()
	// console.log('root-saga-next')

	// yield watcherSaga1()
}
export default rootSaga
