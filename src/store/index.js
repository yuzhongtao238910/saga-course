import {createStore, applyMiddleware} from "redux"
import reducer from "./reducer"


const store = applyMiddleware()(createStore)(reducer)
export default store