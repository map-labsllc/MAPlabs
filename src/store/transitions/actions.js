import {
  TRANSITIONS_LOADING,
  TRANSITIONS_LOAD,
  TRANSITIONS_ERROR_DB,
  TRANSITIONS_UPDATE,
  TRANSITIONS_NO_OP,
} from './constants'

const URL = "http://localhost:3001"
const USER_ID = 1

/* *****************************************************
   updateTransitionsAC()

   Update trasnstions for a question in state.
   Will replace any other transitions for the question.
   Call persistTransitionsAC() to save to database.

   quesion_code - integer
   transitions - array of transitions [{ "from": "here", "to: there" }, {... }]
******************************************************** */
export const updateTransitionsAC = (question_code, transitions) => {
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
export const loadAllTransitionsAC = (userId) => {
  console.log("loadAllTransitionsAC()")

  userId = USER_ID

  return dispatch => {
    dispatch({ type: TRANSITIONS_LOADING })
    return fetch(`${URL}/transitions/${userId}`)
      .then(response => response.json())
      .then((transitions) => {
        // console.log("transitions", transitions)
        return dispatch({ type: TRANSITIONS_LOAD, payload: transitions })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch({ type: TRANSITIONS_ERROR_DB, payload: error })
      });
  }
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
export const persistTransitionsAC = (userId, question_code, transitions) => {
  console.log(`>> persistTransitionsAC(${question_code})`)
  console.log("persisting: ", transitions);

  userId = USER_ID

  return dispatch => {
    return fetch(`${URL}/transitions/${userId}/${question_code}`, {
        method: 'POST',
        body: JSON.stringify({ transitions }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(response => response.json())
      .then((message) => {
        console.log("post response message", message)
        return dispatch( { type: TRANSITIONS_NO_OP })
      })
      .catch((error) => {
        console.log("POST ERROR", error);
        return dispatch( { type: TRANSITIONS_ERROR_DB, payload: error } )
      });
  }
}
