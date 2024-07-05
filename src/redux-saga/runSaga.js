import * as effectTypes from './effectTypes.js'
function runSaga(env, saga) {
	const { channel, dispatch } = env
	let it = saga()
	function next() {
		let { done, value: effect } = it.next()
		if (!done) {
			switch (effect.type) {
				case effectTypes.TAKE:
					channel.once(effect.actionType, next)
					break
				case effectTypes.PUT:
					dispatch(effect.action)
					next()
					break
				default:
					break
			}
		}
	}
	next()
}
export default runSaga
