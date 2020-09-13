import {
  LISTS_LOADING,
  LISTS_LOAD,
  LISTS_ERROR_DB,
} from './constants'

const URL = process.env.REACT_APP_DB_URL

/* *****************************************************
   load()

   Async function to load a JSON file

   dispatch
   list_name -- this is both the list_name of the reducer object and the JSON filename
******************************************************** */
function loadLists() {
  const url= `${URL}/lists`
  return fetch( url )
    .then( response => response.json() )
    .then( ( jsonData ) => {
      return jsonData
    } )
    .catch( ( error ) => {
      console.log( "FETCH ERROR", error )
      return Promise.reject( error )
    })
}

/* *****************************************************
   loadListsAC()

   Load all LISTS
******************************************************** */
export const loadListsAC = () => {
  // console.log( "loadAC()" )

  return async dispatch => {
    dispatch( { type: LISTS_LOADING } )

    return loadLists
      .then(data => {
        dispatch( { type: LISTS_LOAD, payload: data } )
      })
      .catch( ( error ) => {
        console.log("ERROR", error )
        dispatch( { type: LISTS_ERROR_DB, payload: error } )
      })
  }
}
