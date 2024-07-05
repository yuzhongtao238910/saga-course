import * as types from './store/action-types.js'
import { useSelector, useDispatch } from 'react-redux'

function Counter() {
	const number = useSelector((state) => state.number)
	const dispatch = useDispatch()
	return (
		<div>
			<p>{number}</p>
			<button
				onClick={() => {
					dispatch({
						type: types.ADD,
					})
				}}
			>
				按钮
			</button>

			<button
				onClick={() => {
					dispatch({
						type: types.ASYNC_ADD,
					})
				}}
			>
				按钮- 异步
			</button>
		</div>
	)
}
export default Counter
