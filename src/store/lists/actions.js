import {
  LISTS_LOADING,
  LISTS_LOAD,
  LISTS_ERROR_DB,
} from './constants'

const URL = process.env.REACT_APP_DB_URL

/* *****************************************************
   loadListsAC() - Load all LISTS
******************************************************** */
export const loadListsAC = () => {

  const url= `${URL}/lists`
  
  return async dispatch => {
    dispatch( { type: LISTS_LOADING } )

    return fetch(url)
    .then(response => response.json())
    .then(data => {
      return dispatch( { type: LISTS_LOAD, payload: data } )
    })
    .catch( ( error ) => {
      console.log( "FETCH ERROR", error )
      dispatch( { type: LISTS_ERROR_DB, payload: error } )
    })
  }
}
