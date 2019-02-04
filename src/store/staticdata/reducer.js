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

    lifeDescriptors:  // array is in sort order
      [
        { firstPart: 'My life ',
          a: 'does',
          b: 'does not',
          firstPart: ' feel full of meaning',
          order: 1,
        },
        { firstPart: 'I ',
          a: 'often',
          b: 'rarely',
          lastPart: ' feel happy'
          order: 2,
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
  lifeDescriptors: [],
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
      console.log( 'payload.lifeDescriptions', payload.lifeDescriptions )

      // split the 'description' into 'firstPart' and 'lastPart', the delete 'description'
      const enhancedLifeDescriptions = payload.lifeDescriptions.map( ( lifeDescription ) => {
        const newLifeDescription = { ...lifeDescription }
        const split = lifeDescription.description.split( '#' )
        newLifeDescription.firstPart = split[0]
        newLifeDescription.lastPart = split[1]
        delete newLifeDescription.description
        return newLifeDescription
      } )
      // NOTES: enhancedLifeDescripTIONS changes name to lifeDescripTORS
      return {
        ...state,
        isLoading: false,
        beliefs: payload.beliefs,
        strengths: payload.strengths,
        lifeDescriptors: enhancedLifeDescriptions,
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
