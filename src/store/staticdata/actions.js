import {
  // PERSISTANT_ARRAY,
  STATICDATA_LOADING,
  STATICDATA_LOAD,
  STATICDATA_ERROR_DB,
} from './constants'

const URL = process.env.REACT_APP_DB_URL

// JSON filenames are used as the keys when building state, therefore
// don't change them as other code relies on these names.
const LIFEDESCRIPTIONS_FN = 'lifeDescriptions'

/* *****************************************************
   loadstaticJSON()

   Async function to load a JSON file

   dispatch
   section -- this is both the section of the reducer object and the JSON filename
******************************************************** */
function loadstaticJSON(section) {
  const url = `${URL}/${section}.json`
  // console.log( `loadstaticJSON: ${url}` );
  return fetch(url)
    .then(response => response.json())
    .then((jsonData) =>
      // console.log(section, jsonData)
      ({ section, jsonData }))
    .catch((error) => {
      console.log('FETCH ERROR', error)
      return Promise.reject(error)
    })
}

/* *****************************************************
   loadAllStaticdataAC()

   Load all staticdata from the json files in the backend /public directory.
   Called by NavBar::onComponentDidMount()
******************************************************** */
export const loadAllStaticdataAC = () =>
// console.log( "loadAC()" )

  async dispatch => {
    dispatch({ type: STATICDATA_LOADING })

    const p1 = loadstaticJSON(LIFEDESCRIPTIONS_FN)

    return Promise.all([p1])
      .then(result => {
        // console.log(" ");
        // console.log("Promise.all: ", result);

        const payload = {}
        payload[result[0].section] = result[0].jsonData

        dispatch({ type: STATICDATA_LOAD, payload })
        //
      })
      .catch((error) => {
        console.log('PROMISE.ALL ERROR', error)
        dispatch({ type: STATICDATA_ERROR_DB, payload: error })
        //
      })
  }
