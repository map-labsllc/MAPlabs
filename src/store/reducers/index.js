import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import answersRD from '../answers/reducer'
import transitionsRD from '../transitions/reducer'

export default combineReducers({
  auth: AuthReducer,
  answersRD,
  transitionsRD,
})
