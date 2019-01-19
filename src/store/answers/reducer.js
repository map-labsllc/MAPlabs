import {
  LOADING,
  LOAD,
  ERROR_DB,
 } from './constants';

/*
  answersRD: {
    isLoading: true,
    errorDB: false,
    errorMessage: '',
    questions: {
      1: [ 'answer one', 'answer two' ],
      2: [ 'this is a narrative, so only one answer' ],
    },
  }
*/

const initialState = {
  isLoading: true,
  errorDB: false,
  errorMessage: '',
  questions: {}, // { 1:  [ 'question 1 answer', 'second answer for question' ],
                 //   37: [ 'this is narrative 37, so only one answer' ], }
}

/* ***********************************************
   getAnswers()
   Get array of answers strings for a given question_code

   param store -- global state
   param question_code -- integer

   return array of answer strings or empty array
************************************************** */
export const getAnswers = (state, question_code) =>
  state.answersRD.questions[question_code] || []

/* ***********************************************
   setAnswers()

   param state -- global state
   param question_code -- integer
   param answers -- array of answer strings

   return undefined
************************************************** */
export const setAnswers = (state, question_code, answers) => {
  state.answersRD.questions[question_code] = answers
  return;
}


 /* ***********************************************
    answersRD
 ************************************************** */
 export const answersRD = (state = initialState, action) => {

  switch(action.type) {

    // Reset the reducer to initial state, could be
    //   used when switching users.
    case LOADING:
      console.log("answersRD::LOADING");
      return initialState;

    // Payload contains object w/
    //   key:value pairs of (Question#): (array or answer strings)
    case LOAD:
      console.log("answersRD::LOAD");
      return {
        ...state,
        isLoading: false,
        questions: action.payload,
      };

    case ERROR_DB:
      console.log("answersRD::ERROR_DB");
      return {
        ...state,
        isLoading: false,
        errorDB: true,
        errorMessage: action.payload.errorMessage,
      }

    default:
      return state;
   }
 }

 export default answersRD
