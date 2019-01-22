import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import answersRD from '../answers/reducer'
import transitionsRD from '../transitions/reducer'
import staticdataRD from '../staticdata/reducer'
import userRD from '../user/reducer'

export default combineReducers({
  auth: AuthReducer,
  answersRD,
  transitionsRD,
  staticdataRD,
  userRD,
})
