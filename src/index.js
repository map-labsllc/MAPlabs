import React from 'react'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import store from "./store"

const { REACT_GOOGLE_ANALYTICS_ID } = process.env
ReactGA.initialize(REACT_GOOGLE_ANALYTICS_ID)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
