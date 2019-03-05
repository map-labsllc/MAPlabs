import {
  ANSWERSX_LOADING,
  ANSWERSX_LOAD,
  ANSWERSX_ERROR_DB,
  ANSWERSX_UPDATE,
  ANSWERSX_PERSIST,
} from './constants'

import { getAnswersx } from './reducer'

const URL = process.env.REACT_APP_DB_URL

/* *****************************************************
   updateAnswersAC()

   Update answers for a question in state.
   Will replace any other answers for the question.
   Call persistQuestionAC() if you want to persist to database.

   quesion_code - integer
   answers - array of answer strings
******************************************************** */
export const updateAnswersxAC = ( question_code, answers ) => {
  return {
    type: ANSWERSX_UPDATE,
    payload: { question_code, answers }
  }
}

/* *****************************************************
   loadAllAnswersAC()

   Load user's persisted answers for all questions
   Called by NavBar::onComponentDidMount()

   userId
******************************************************** */
export const loadAllAnswersxAC = ( userId ) => {
  console.log( "loadAllAnswersAC()" )

  return async dispatch => {
    dispatch( { type: ANSWERSX_LOADING } )
    const jwt = JSON.parse( localStorage.getItem( 'jwt' ) )
    return fetch( `${URL}/answers/${userId}`, {
      headers: {Authorization: `Token: ${jwt}`}
    } )
      .then( response => response.json() )
      .then( ( answers ) => {
        // console.log("answers", answers)
        return dispatch( { type: ANSWERSX_LOAD, payload: answers } )
      } )
      .catch( ( error ) => {
        console.log( "FETCH ERROR", error )
        return dispatch( { type: ANSWERSX_ERROR_DB, payload: error } )
      } )
  }
}

/* *****************************************************
   persistAnswersFromQuestionAC()

   Persists answers for a question to db.  This is only called by <QuestionsCT>.

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
export const persistAnswersxFromQuestionAC = ( dispatch, store, userId, questionCode, questionType ) => {
  const answers = getAnswersx( store.answersxRD, questionCode )
  console.log("persistAnswersxFromQuestionAC(), answers:", answers)
  return dispatch( persistAnswersxAC( userId, questionCode, questionType, answers ) )
}

/* *****************************************************
   persistAnswersAC()

   Persists answers for a question.

   Warning: The following example fails b/c store isn't updated before getAnswers() is
            called. You need to pass "answers" directly to persistQuestionAC().

     this.props.dispatch(updateAnswersAC(question_code, answers))
     // BROKEN: this.props.dispatch(persistAnswersAC(question_code, getAnswers(this.props.answersRD, question_code)))

   userId
   quesion_code - integer
   question_type -- integer from ./contants.js
   answers - 2D array of up to four strings each
                [ [ "ans1", "ans2", "ans3, "ans4"], [...] ]
             Note:  only need to supply as many strings as are user, ex:
                [ [ "narrative" ] ]
******************************************************** */
export const persistAnswersxAC = ( userId, question_code, question_type, answers ) => {
  console.log( `persistAnswersAC(${question_code})  XYZ` )
  console.log( "persisting: ", answers )

  return async dispatch => {
    const jwt = JSON.parse( localStorage.getItem( 'jwt' ) )
    return fetch( `${URL}/answers/${userId}/${question_code}/${question_type}`, {
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
        return dispatch( { type: ANSWERSX_PERSIST } )
      } )
      .catch( ( error ) => {
        console.log( "POST ERROR", error )
        return dispatch( { type: ANSWERSX_ERROR_DB, payload: error } )
      } )
  }
}
