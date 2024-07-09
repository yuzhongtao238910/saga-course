// import { takeEvery } from 'redux-saga/effects'
import {
	take,
	put,
	fork,
	takeEvery,
	call,
	cps,
	all,
	cancel,
} from '../../redux-saga/effects'
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

function callback_delay(ms, callback) {
	setTimeout(() => {
		callback(null, 'data')
	}, ms)
}

function* add() {
	// yield call(delay, 4000)
	yield cps(callback_delay, 2000)
	yield put({
		type: types.ADD,
	})
}

function* minus() {
	yield delay(2000)
	yield put({
		type: types.ADD,
	})
}

function* sum1() {
	for (let i = 0; i < 1; i++) {
		yield delay(3000)
		yield take(types.ASYNC_ADD)
		yield put({
			type: types.ADD,
		})
	}
	console.log('add1 done')
	return 'sum1-done'
}
function* sum2() {
	for (let i = 0; i < 2; i++) {
		yield take(types.ASYNC_ADD)
		yield put({
			type: types.ADD,
		})
	}
	console.log('add2 done')
	return 'sum2-done'
}

function* temp() {
	while (true) {
		yield delay(2000)
		yield put({
			type: types.ADD,
		})
	}
}

function* addWatcher() {
	const task = yield fork(temp)
	yield take(types.STOP_ADD)
	yield cancel(task)
}
function* rootSaga() {
	// 不会阻塞当前的saga向后执行 2-永远不会结束，就类似于while true
	// yield takeEvery(types.ASYNC_ADD, add)
	// console.log('next')
	// console.log('root-saga')
	// yield watcherSaga()
	// console.log('root-saga-next')

	// yield watcherSaga1()

	// 不会阻塞当前的saga向后执行，永远不会结束
	// yield takeEvery(types.ASYNC_ADD, add)

	// yield takeEvery(types.ASYNC_MINUS, minus)

	// let result = yield all([sum1(), sum2()])
	// console.log(result, 'done')

	yield addWatcher()
}
export default rootSaga
