import { combineReducers } from 'redux'
import answersRD from '../answers/reducer'
import answersxRD from '../answersx/reducer'
import transitionsRD from '../transitions/reducer'
import staticdataRD from '../staticdata/reducer'
import userRD from '../user/reducer'
import uiRD from '../ui/reducer'

export default combineReducers( {
  answersRD,
  answersxRD,
  transitionsRD,
  staticdataRD,
  userRD,
  uiRD,
} )
