import { combineReducers } from 'redux'
import answersRD from '../answers/reducer'
import transitionsRD from '../transitions/reducer'
import staticdataRD from '../staticdata/reducer'
import userRD from '../user/reducer'
import uiRD from '../ui/reducer'

export default combineReducers( {
  answersRD,
  transitionsRD,
  staticdataRD,
  userRD,
  uiRD,
} )
