import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import answersRD from '../store/answers/reducer'

export default combineReducers({
  auth: AuthReducer,
  answersRD,
})
