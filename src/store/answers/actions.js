import {
  ANSWERS_LOADING,
  ANSWERS_LOAD,
  ANSWERS_ERROR_DB,
  ANSWERS_UPDATE,
  ANSWERS_PERSIST,
} from './constants'

import { getAnswers } from './reducer'

const URL = process.env.REACT_APP_DB_URL

/* *****************************************************
   updateAnswersAC()

   Update answers for a question in state.
   Will replace any other answers for the question.
   Call persistQuestionAC() to save to database.

   quesion_code - integer
   answers - array of answer strings
******************************************************** */
export const updateAnswersAC = ( question_code, answers ) => {
  return {
    type: ANSWERS_UPDATE,
    payload: { question_code, answers }
  }
}

/* *****************************************************
   loadAllAnswersAC()

   Load user's persisted answers for all questions
   Called by NavBar::onComponentDidMount()

   userId
******************************************************** */
export const loadAllAnswersAC = ( userId ) => {
  console.log( "loadAllAnswersAC()" )

  return async dispatch => {
    dispatch( { type: ANSWERS_LOADING } )
    const jwt = JSON.parse( localStorage.getItem( 'jwt' ) )
    return fetch( `${URL}/answers/${userId}`, {
      headers: {Authorization: `Token: ${jwt}`} 
    } )
      .then( response => response.json() )
      .then( ( answers ) => {
        // console.log("answers", answers)
        return dispatch( { type: ANSWERS_LOAD, payload: answers } )
      } )
      .catch( ( error ) => {
        console.log( "FETCH ERROR", error )
        return dispatch( { type: ANSWERS_ERROR_DB, payload: error } )
      } )
  }
}

/* *****************************************************
   persistAnswersFromQuestionAC()

   Persists answers for a question.  This is only called by <QuestionsCT>.

   This is NOT great Redux form.  However not sure where to put this logic.  The
     alternative is to keep it in QuestionsCT with a switch statement to select
     the correct reducer for the set of questions being managed.  But we're trying to
     keep the framework components clean on knowledge of what they contain.

   params:
     dispatch
     store
     userId
     questionCode
******************************************************** */
export const persistAnswersFromQuestionAC = ( dispatch, store, userId, questionCode ) => {
  const answers = getAnswers( store.answersRD, questionCode )
  return dispatch( persistAnswersAC( userId, questionCode, answers ) )
}

/* *****************************************************
   persistAnswersAC()

   Persists answers for a question.

   Warning: The following fails b/c store isn't updated before getAnswers() is
            called. You need to pass "answers" directly to persistQuestionAC().

     this.props.dispatch(updateAnswersAC(question_code, answers))
     // BROKEN: this.props.dispatch(persistAnswersAC(question_code, getAnswers(this.props.answersRD, question_code)))

   userId
   quesion_code - integer
   answers - array of answer strings
******************************************************** */
export const persistAnswersAC = ( userId, question_code, answers ) => {
  console.log( `persistAnswersAC(${question_code})` )
  console.log( "persisting: ", answers )

  return async dispatch => {
    const jwt = JSON.parse( localStorage.getItem( 'jwt' ) )
    return fetch( `${URL}/answers/${userId}/${question_code}`, {
        method: 'POST',
        body: JSON.stringify( { answers } ),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token: ${jwt}`
        },
      } )
      .then( response => response.json() )
      .then( ( message ) => {
        console.log( "post response message", message )
        return dispatch( { type: ANSWERS_PERSIST } )
      } )
      .catch( ( error ) => {
        console.log( "POST ERROR", error )
        return dispatch( { type: ANSWERS_ERROR_DB, payload: error } )
      } )
  }
}
