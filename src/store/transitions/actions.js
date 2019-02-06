import {
  TRANSITIONS_LOADING,
  TRANSITIONS_LOAD,
  TRANSITIONS_ERROR_DB,
  TRANSITIONS_UPDATE,
  TRANSITIONS_PERSIST,
} from './constants'

import { getTransitions } from './reducer'


const URL = process.env.REACT_APP_DB_URL

/* *****************************************************
   updateTransitionsAC()

   Update transitions for a question in state.
   Will replace any other transitions for the question.
   Call persistTransitionsAC() to save to database.

   quesion_code - integer
   transitions - array of transitions [{ "from": "here", "to: there" }, {... }]
******************************************************** */
export const updateTransitionsAC = ( question_code, transitions ) => {
  return {
    type: TRANSITIONS_UPDATE,
    payload: { question_code, transitions }
  }
}

/* *****************************************************
   loadAllTransitionsAC()

   Load user's persisted transitions
   Called by NavBar::onComponentDidMount()

   userId -- integer
******************************************************** */
export const loadAllTransitionsAC = ( userId ) => {
  console.log( "loadAllTransitionsAC()" )

  const jwt = JSON.parse( localStorage.getItem( 'jwt' ) )

  return async dispatch => {
    dispatch( { type: TRANSITIONS_LOADING } )
    return fetch( `${URL}/transitions/${userId}`, {
      headers: {
        Authorization: `Token: ${jwt}`
      }
    } )
      .then( response => response.json() )
      .then( ( transitions ) => {
        // console.log("transitions", transitions)
        return dispatch( { type: TRANSITIONS_LOAD, payload: transitions } )
      } )
      .catch( ( error ) => {
        console.log( "FETCH ERROR", error )
        return dispatch( { type: TRANSITIONS_ERROR_DB, payload: error } )
      } )
  }
}

/* *****************************************************
   persistTransitionsFromQuestionAC()

   Persists transitions for a question.  This is only called by <QuestionsCT>.

   This is NOT great Redux form.  However not sure where to put this logic.  The
     alternative is to keep it in QuestionCT with a switch statement to select
     the correct reducer for the set of questions being managed.  But we're trying to
     keep the framework components clean on knowledge of what they contain.

   params:
     dispatch
     store
     userId
     questionCode
******************************************************** */
export const persistTransitionsFromQuestionAC = ( dispatch, store, userId, questionCode ) => {
  const transitions = getTransitions( store.transitionsRD, questionCode )
  return dispatch( persistTransitionsAC( userId, questionCode, transitions ) )
}

/* *****************************************************
   persistTransitionsAC()
   Persists transitions for a question.

   Warning: The following fails b/c store isn't updated before getTransitions() is
            called. You need to pass "transitons" directly to persistTransitionsAC().

     this.props.dispatch(updateTransitionsAC(question_code, transitions))
     // BROKEN: this.props.dispatch(persistTransitionsAC(question_code, getTransitions(this.props.transitionsRD, question_code)))

   userId -- integer
   quesion_code - integer
   transitions - array of transitions
******************************************************** */
export const persistTransitionsAC = ( userId, question_code, transitions ) => {
  console.log( `>> persistTransitionsAC(${question_code})` )
  console.log( "persisting: ", transitions )

  return async dispatch => {
    const jwt = JSON.parse( localStorage.getItem( 'jwt' ) )
    return fetch( `${URL}/transitions/${userId}/${question_code}`, {
        method: 'POST',
        body: JSON.stringify( { transitions } ),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${jwt}`
        },
      } )
      .then( response => response.json() )
      .then( ( message ) => {
        console.log( "post response message", message )
        return dispatch( { type: TRANSITIONS_PERSIST } )
      } )
      .catch( ( error ) => {
        console.log( "POST ERROR", error )
        return dispatch( { type: TRANSITIONS_ERROR_DB, payload: error } )
      } )
  }
}
