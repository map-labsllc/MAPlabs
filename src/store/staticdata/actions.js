import {
  // PERSISTANT_ARRAY,
  STATICDATA_LOADING,
  STATICDATA_LOAD,
  STATICDATA_ERROR_DB,
} from './constants'

const URL = process.env.REACT_APP_DB_URL

// JSON filenames are used as the keys when building state, therefore
// don't change them as other code relies on these names.
const BELIEFS_FN = 'beliefs'
const LIFEDESCRIPTIONS_FN = 'lifeDescriptions'
const STRENGTHS_FN = 'strengths'

/* *****************************************************
   loadstaticJSON()

   Async function to load a JSON file

   dispatch
   section -- this is both the section of the reducer object and the JSON filename
******************************************************** */
function loadstaticJSON( section ) {
  const url= `${URL}/${section}.json`
  console.log( `loadstaticJSON: ${url}` );
  return fetch( url )
    .then( response => response.json() )
    .then( ( jsonData ) => {
      // console.log(section, jsonData)
      return { section, jsonData }
    } )
    .catch( ( error ) => {
      console.log( "FETCH ERROR", error )
      return Promise.reject( error )
    } )
}

/* *****************************************************
   loadAllStaticdataAC()

   Load all staticdata from the json files in the backend /public directory.
   Called by NavBar::onComponentDidMount()
******************************************************** */
export const loadAllStaticdataAC = () => {
  console.log( "loadAC()" )

  return async dispatch => {
    dispatch( { type: STATICDATA_LOADING } )

    const p1 = loadstaticJSON( BELIEFS_FN )
    const p2 = loadstaticJSON( LIFEDESCRIPTIONS_FN )
    const p3 = loadstaticJSON( STRENGTHS_FN )

    return Promise.all( [p1, p2, p3] )
      .then( result => {
        // console.log(" ");
        // console.log("Promise.all: ", result);

        const payload = {}
        payload[result[0].section] = result[0].jsonData
        payload[result[1].section] = result[1].jsonData
        payload[result[2].section] = result[2].jsonData

        return dispatch( { type: STATICDATA_LOAD, payload } )
      } )
      .catch( ( error ) => {
        console.log( "PROMISE.ALL ERROR", error )
        return dispatch( { type: STATICDATA_ERROR_DB, payload: error } )
      } )
  }
}

// export const addToPersistingArray = array => {
//  return {
//    type: PERSISTANT_ARRAY,
//    payload: array
//  }
// }
