import * as effectTypes from './effectTypes.js'
/**
 *
 * @param {*} env 环境对象
 * @param {*} saga saga可能是一个生成器 也可能是一个迭代器
 */
function runSaga(env, saga) {
	const { channel, dispatch } = env
	let it = typeof saga === 'function' ? saga() : saga
	function next() {
		let { done, value: effect } = it.next()
		console.log(effect, 12)
		// 产出的指令对象是一个迭代器的话 会相当于开启一个新的子进程来运行此迭代器
		if (effect && typeof effect[Symbol.iterator] === 'function') {
			runSaga(env, effect)
			next()
		} else if (effect instanceof Promise) {
			effect.then(() => next())
		} else {
			if (!done) {
				switch (effect.type) {
					case effectTypes.TAKE:
						channel.once(effect.actionType, () => {
							// debugger
							next()
						})
						break
					case effectTypes.PUT:
						dispatch(effect.action)
						next()
						break
					case effectTypes.FORK:
						runSaga(env, effect.saga) // 就是从头走一遍rootSaga
						next()
						break
					default:
						break
				}
			}
		}
	}
	next()
}
export default runSaga
