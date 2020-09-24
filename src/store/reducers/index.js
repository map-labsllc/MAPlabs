import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import answersRD from '../answers/reducer'
import staticdataRD from '../staticdata/reducer'
import userRD from '../user/reducer'
import uiRD from '../ui/reducer'
import listsRD from '../lists/reducer'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  answersRD,
  listsRD,
  staticdataRD,
  userRD,
  uiRD,
})
export default createRootReducer
