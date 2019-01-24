import {
  STATICDATA_LOADING,
  STATICDATA_LOAD,
  STATICDATA_ERROR_DB,
 } from './constants'

/*
  staticdataRD: {  // loaded with fetch call to a file
    isLoading: true,
    isError: false,
    errorMessage: '',

    beliefs: [ 'belief1', 'belief2', ],

    strengths: [ 'strength1', 'strength2', ],

    lifeDescriptions:  // sort-order set when loaded from db
      [
        { description: 'My life # feel full of meaning',
          a: 'does',
          b: 'does not'
        },
        { description: 'I # feel happy',
          a: 'often',
          b: 'rarely'
        },
      ]
}
*/

const initialState = {
  isLoading: true,
  isError: false,
  errorMessage: '',
  beliefs: [],
  strengths: [],
  lifeDescriptions: [],
}

 /* ***********************************************
    staticdataRD
 ************************************************** */
 export const staticdataRD = ( state = initialState, action ) => {

  const { type, payload } = action

  switch( type ) {

    // Reset the reducer to initial state
    case STATICDATA_LOADING:
      console.log( "staticdataRD::LOADING" )
      return initialState

    // payload has beliefs, strengths, and lifeDescriptions JSON file contents
    case STATICDATA_LOAD:
      console.log( "staticdataRD::LOAD" )
      return {
        ...state,
        isLoading: false,
        beliefs: payload.beliefs,
        strengths: payload.strengths,
        lifeDescriptions: payload.lifeDescriptions,
      }


    // Fetch error
    case STATICDATA_ERROR_DB:
      console.log( "staticdataRD::ERROR_DB" )
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload || "no error message provided",
      }

    default:
      return state
   }
 }

 export default staticdataRD
