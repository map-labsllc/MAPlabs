import {
  ANSWERS_LOADING,
  ANSWERS_LOAD,
  ANSWERS_UPDATE,
  ANSWERS_ERROR_DB,
  ANSWERS_NO_OP,
 } from './constants';

/*
  answersRD: {
    isLoading: true,
    isError: false,
    errorMessage: '',
    questions: {
      1: [ 'answer one', 'answer two' ],
      2: [ 'this is a narrative, so only one answer' ],
    },
  }
*/

const initialState = {
  isLoading: true,
  isError: false,
  errorMessage: '',
  questions: {},
}

/* ***********************************************
   getAnswers()

   Get array of answers strings for a given question_code

   state -- answersRD (this reducer, not the entire store)
   question_code -- integer

   return array of answer strings or empty array
************************************************** */
export const getAnswers = (state, question_code) =>
  state.questions[question_code] || []

 /* ***********************************************
    answersRD
 ************************************************** */
 export const answersRD = (state = initialState, action) => {

  const { type, payload } = action

  switch(type) {

    // Reset the reducer to initial state, could be
    //   used when switching users.
    case ANSWERS_LOADING:
      console.log("answersRD::LOADING");
      return initialState;

    // Payload:
    //  {
    //    1: [ 'answer one', 'answer two' ],
    //    2: [ 'this is a narrative, so only one answer' ],
    //  }
    case ANSWERS_LOAD:
      console.log("answersRD::LOAD");
      return {
        ...state,
        isLoading: false,
        questions: payload,
      };

    // Payload: { question_code: 6, answers: ["one", "two"] }
    case ANSWERS_UPDATE:
      console.log("answersRD::UPDATE");
      const newQuestions = { ...state.questions };
      newQuestions[payload.question_code] = payload.answers
      return {
        ...state,
        questions: newQuestions,
      };

    // Fetch error
    case ANSWERS_ERROR_DB:
      console.log("answersRD::ERROR_DB");
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload || "no error message provided",
      }

      // no operation, AC didn't change stat
      case ANSWERS_NO_OP:
        console.log("answersRD::NO_OP")
        return state

    default:
      return state
   }
 }

 export default answersRD
