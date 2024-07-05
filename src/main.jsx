import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import Counter from "./Counter.jsx"
import {Provider} from "react-redux"
import store from "./store"
// npm i redux react-redux redux-saga
const root = createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<Counter />
	</Provider>
	)
