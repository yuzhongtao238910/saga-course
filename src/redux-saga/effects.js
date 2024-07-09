import * as effectTypes from './effectTypes.js'

export function take(actionType) {
	return { type: effectTypes.TAKE, actionType }
}
export function put(action) {
	return {
		type: effectTypes.PUT,
		action,
	}
}
// 不是开启一个新的子进程，而是从头的runSaga
export function fork(saga) {
	return {
		type: effectTypes.FORK,
		saga,
	}
}
export function takeEvery(actionType, saga) {
	function* takeEveryHelper() {
		while (true) {
			yield take(actionType)
			yield fork(saga)
		}
	}
	// 开启一个新的子进程运行 takeEveryHelper
	return fork(takeEveryHelper)
}

// call是支持promise cps是支持回调函数
export function call(fn, ...args) {
	return {
		type: effectTypes.CALL,
		fn,
		args,
	}
}

export function cps(fn, ...args) {
	return {
		type: effectTypes.CPS,
		fn,
		args,
	}
}
export function all(iterators) {
	return {
		type: effectTypes.ALL,
		iterators,
	}
}
export function cancel(task) {
	return {
		type: effectTypes.CANCEL,
		task,
	}
}
const delayFn = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

export function delay(...args) {
	return call(delayFn, ...args)
}
