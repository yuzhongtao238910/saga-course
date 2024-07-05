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
