import {
  STATICDATA_LOADING,
  STATICDATA_LOAD,
  STATICDATA_UPDATE,
  STATICDATA_ERROR_DB,
  STATICDATA_NO_OP,
 } from './constants';

/*
  staticdataRD: {  // loaded with fetch call to a file
    isLoading: true,
    isError: false,
    errorMessage: '',

    beliefs: [ 'belief1', 'belief2', ],

    strengths: [ 'strength1', 'strength2', ],

    lifedescrs:   // sort-order set when loaded from db
      [
        { descr: 'My life # feel full of meaning',
          a: 'does',
          b: 'does not'
        },
        { descr: 'I # feel happy',
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
  lifedescrs: [],
}

 /* ***********************************************
    staticdataRD
 ************************************************** */
 export const staticdataRD = (state = initialState, action) => {

  const { type, payload } = action

  switch(type) {

    // Reset the reducer to initial state
    case STATICDATA_LOADING:
      console.log("staticdataRD::LOADING");
      return initialState;

    // Payload:
    //  {
    //    1: [ 'answer one', 'answer two' ],
    //    2: [ 'this is a narrative, so only one answer' ],
    //  }
    case STATICDATA_LOAD:
      console.log("staticdataRD::LOAD");
      return {
        ...state,
        isLoading: false,
        beliefs: payload.beliefs,
        strengths: payload.strengths,
        lifedescrs: payload.lifedescrs,
      };
    // case LOAD:
    //   console.log("staticdataRD::LOAD");
    //   return {
    //     ...state,
    //     isLoading: false,
    //     beliefs: payload.beliefs,
    //     strengths: payload.strengths,
    //     lifedescrs: payload.lifedescrs,
    //   };

    // Fetch error
    case STATICDATA_ERROR_DB:
      console.log("staticdataRD::ERROR_DB");
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload || "no error message provided",
      }

      // no operation, AC didn't change stat
      case STATICDATA_NO_OP:
        console.log("staticdataRD::NO_OP")
        return state

    default:
      return state
   }
 }

 export default staticdataRD
