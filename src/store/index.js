import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'

import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [
  thunk,
]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger()) // log actions and pre and post store state
}

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

export default store