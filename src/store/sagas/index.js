import { take, put } from 'redux-saga/effects'
import * as types from '../action-types.js'
function delay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})
}
function* workerSaga() {
	yield delay(1000)
	yield put({ type: types.ADD })
}
function* watcherSaga() {
	// 产出一个对应的effect，等待有人向仓库派发一个 ASYNC_ADD 的动作
	// 如果等不到，saga就会暂停在这里，否则就是
	while (true) {
		yield take(types.ASYNC_ADD) // take只能够监听一次
		yield workerSaga()
	}
}

function* rootSaga() {
	console.log('root-saga')
	yield watcherSaga()
}
export default rootSaga
