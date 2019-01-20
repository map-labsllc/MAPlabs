import {
  LOADING,
  LOAD,
  ERROR_DB,
  NO_OP,
} from './constants'

const URL = "http://localhost:3001"

/* *****************************************************
   loadAllStaticdataAC()
   Load all staticdata
   Called by NavBar::onComponentDidMount()
******************************************************** */
export const loadAllStaticdataAC = () => {
  console.log("loadAC()")

  return dispatch => {
    dispatch({ type: LOADING })
    return fetch(`${URL}/lifedescrs.json`)
      .then(response => response.json())
      .then((lifedescrs) => {
        console.log("lifedescrs", lifedescrs)
        return dispatch({ type: LOAD, payload: { lifedescrs } })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch({ type: ERROR_DB, payload: error })
      });
  }
}
