import {
  LOADING,
  LOAD,
  UPDATE,
  ERROR_DB,
  NO_OP,
 } from './constants';

/*
  staticdataRD: {  // loaded with fetch call to a file
    isLoading: true,
    errorDB: false,
    errorMessage: '',

    beliefs: [ 'belief1', 'belief2', ],

    strengths: [ 'strength1', 'strength2', ],

    lifedescs:   // sort-order set when loaded from db
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
  errorDB: false,
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
    case LOADING:
      console.log("staticdataRD::LOADING");
      return initialState;

    // Payload:
    //  {
    //    1: [ 'answer one', 'answer two' ],
    //    2: [ 'this is a narrative, so only one answer' ],
    //  }
    case LOAD:
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
    case ERROR_DB:
      console.log("staticdataRD::ERROR_DB");
      return {
        ...state,
        isLoading: false,
        errorDB: true,
        errorMessage: payload || "no error message provided",
      }

      // no operation, AC didn't change stat
      case NO_OP:
        console.log("staticdataRD::NO_OP")
        return state

    default:
      return state
   }
 }

 export default staticdataRD
