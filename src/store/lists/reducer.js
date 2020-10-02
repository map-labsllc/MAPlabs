import {
  LISTS_LOADING,
  LISTS_LOAD,
  LISTS_ERROR_DB,
 } from './constants'

/*
  listsRD: {  // loaded with fetch call to a file
    isLoading: true,
    isError: false,
    errorMessage: '',

    lists: {
      beliefs: [ {id: 1, value: 'belief1'}, {id: 2, value: 'belief2'}, ... ],
      strengths: [ {id: 10, value: 'strength1'}, {id: 11, value: 'strength2'} ],
      relationships: [ {id: 100, value: 'brother', {id: 101, value: 'coach'}, ... ]
    }
  }
*/

const initialState = {
  isLoading: true,
  isError: false,
  errorMessage: '',
  lists: {}
}

 /* ***********************************************
    listsRD
 ************************************************** */
 export const listsRD = ( state = initialState, action ) => {

  // console.log("listsRD", action )
  const { type, payload } = action

  switch( type ) {

    // Reset the reducer to initial state
    case LISTS_LOADING:
      return initialState

    case LISTS_LOAD:
      return {
        ...state,
        isLoading: false,
        lists: payload
      }

    // Fetch error
    case LISTS_ERROR_DB:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload || "error loading lists",
      }

    default:
      return state
   }
 }

 export default listsRD
