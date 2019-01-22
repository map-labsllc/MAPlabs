import {
  STATICDATA_LOADING,
  STATICDATA_LOAD,
  STATICDATA_ERROR_DB
} from './constants'

const URL = "http://localhost:3001"

// JSON filenames are used as the keys when building state, therefore
// don't change them as other code relies on these names.
const BELIEFS_FN = 'beliefs'
const LIFEDESCRS_FN = 'lifedescrs'
const STRENGTHS_FN = 'strengths'

/* *****************************************************
   loadstaticJSON()

   Async function to

   dispatch
   jsonFileName
******************************************************** */
function loadstaticJSON(section) {
  return fetch(`${URL}/${section}.json`)
    .then(response => response.json())
    .then((jsonData) => {
      // console.log(section, jsonData)
      return { section, jsonData }
    })
    .catch((error) => {
      console.log("FETCH ERROR", error);
      return Promise.reject(error)
    });
}

/* *****************************************************
   loadAllStaticdataAC()

   Load all staticdata from the son files in the backend /public directory.
   Called by NavBar::onComponentDidMount()
******************************************************** */
export const loadAllStaticdataAC = () => {
  console.log("loadAC()")

  return dispatch => {
    dispatch({ type: STATICDATA_LOADING })

    const p1 = loadstaticJSON(dispatch, BELIEFS_FN)
    const p2 = loadstaticJSON(dispatch, LIFEDESCRS_FN)
    const p3 = loadstaticJSON(dispatch, STRENGTHS_FN)

    return Promise.all([p1, p2, p3])
      .then(result => {
        // console.log(" ");
        // console.log("Promise.all: ", result);

        const payload = {}
        payload[result[0].section] = result[0].jsonData
        payload[result[1].section] = result[1].jsonData
        payload[result[2].section] = result[2].jsonData

        dispatch({ type: STATICDATA_LOAD, payload })
      })
      .catch((error) => {
        console.log("PROMISE.ALL ERROR", error);
        return dispatch({ type: STATICDATA_ERROR_DB, payload: error })
      });
  }
}
