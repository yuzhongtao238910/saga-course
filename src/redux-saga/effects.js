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
