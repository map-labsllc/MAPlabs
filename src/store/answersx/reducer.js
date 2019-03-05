import {
  ANSWERSX_LOADING,
  ANSWERSX_LOAD,
  ANSWERSX_UPDATE,
  ANSWERSX_ERROR_DB,
  ANSWERSX_PERSIST,
 } from './constants'

/*
  answersxRD: {
    isLoading: true,
    isError: false,
    errorMessage: '',
    questions: {
      1: [ [ 'narrative, so only one answer', '', '', '' ] ],
      2: [ [ 'from', 'to', '','' },
      3: [ ... ]
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
   getAnswersx()

   Get 2D array of strings for a given question_code

   state -- answersRD (this reducer, not the entire store)
   question_code -- integer

   return array of array of answer strings or []
************************************************** */
export const getAnswersx = ( state, question_code ) =>
  state.questions[question_code] || []

 /* ***********************************************
    answersxRD
 ************************************************** */
 export const answersxRD = ( state = initialState, action ) => {

  const { type, payload } = action

  switch( type ) {

    // Reset the reducer to initial state, could be
    //   used when switching users.
    case ANSWERSX_LOADING:
      console.log( "answersxRD::LOADING" )
      return initialState

    // Payload:
    //  {
    //    1: [ [ 'narrative, so only one answer' ] ],
    //    2: [ [ 'from', 'to' ],
    //         [ 'east', 'west' ]
    //       ]
    //  }
    case ANSWERSX_LOAD:
      console.log( "answersxRD::LOAD" )
      return {
        ...state,
        isLoading: false,
        questions: payload,
      }

    // Payload: todo: add example
    case ANSWERSX_UPDATE:
      console.log( "answersxRD::UPDATE" )
      const newQuestions = { ...state.questions }
      newQuestions[payload.question_code] = payload.answers
      return {
        ...state,
        questions: newQuestions,
      }

    // Fetch error
    case ANSWERSX_ERROR_DB:
      console.log( "answersxRD::ERROR_DB" )
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload || "no error message provided",
      }

      // answers for a question were persisted
      case ANSWERSX_PERSIST:
        console.log( "answersxRD::PERSIST" )
        return state

    default:
      return state
   }
 }

 export default answersxRD
