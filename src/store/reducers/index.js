import { combineReducers } from 'redux'
import answersRD from '../answers/reducer'
import staticdataRD from '../staticdata/reducer'
import userRD from '../user/reducer'
import uiRD from '../ui/reducer'
import listsRD from '../lists/reducer'

export default combineReducers( {
  answersRD,
  listsRD,
  staticdataRD,
  userRD,
  uiRD,
} )
