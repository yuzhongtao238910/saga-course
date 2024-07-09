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




export function takeLatest(actionType, saga) {  
    let lastTask;  
  
    // 定义一个帮助函数来执行逻辑  
    function* takeLatestHelper() {  
        while (true) {  
            const action = yield take(actionType); // 等待 action  
  
            if (lastTask) {  
                // 如果有上一个任务，则取消它  
                yield cancel(lastTask);  
            }  
  
            // 启动新的任务  
            lastTask = yield fork(saga, action);  
        }  
    }  
  
    // 返回一个 fork 调用，启动 takeLatestHelper  
    return fork(takeLatestHelper);  
}  