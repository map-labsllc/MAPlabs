import {
  LOADING,
  LOAD,
  UPDATE,
  ERROR_DB,
  NO_OP,
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

   param store -- state of the reduser
   param question_code -- integer

   return array of answer strings or empty array
************************************************** */
export const getAnswers = (state, question_code) =>
  state.questions[question_code] || []

 /* ***********************************************
    answersRD
 ************************************************** */
 export const answersRD = (state = initialState, action) => {

  const { payload } = action

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

    // Payload { question_code: 6, answers: ["one", "two"] }
    case UPDATE:
      console.log("answersRD::UPDATE");
      const newQuestions = { ...state.questions };
      newQuestions[payload.question_code] = payload.answers
      return {
        ...state,
        questions: newQuestions,
      };

    case ERROR_DB:
      console.log("answersRD::ERROR_DB");
      return {
        ...state,
        isLoading: false,
        errorDB: true,
        errorMessage: action.payload.errorMessage,
      }

      // Payload contains object w/
      //   key:value pairs of (Question#): (array or answer strings)
      case NO_OP:
        console.log("answersRD::NO_OP")
        return state

    default:
      return state
   }
 }

 export default answersRD
