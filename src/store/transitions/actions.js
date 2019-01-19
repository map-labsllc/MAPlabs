import {
  LOADING,
  LOAD,
  ERROR_DB,
  UPDATE,
  NO_OP,
} from './constants'

const URL = "http://localhost:3001"
const USER_ID = 1

/* *****************************************************
   updateQuestionAC()
   Update trasnstions for a question in state.
   Will replace any other transitions for the question.
   Call persistQuestionAC() to save to database.

   quesion_code - integer
   transitions - array of transitions [{ "from": "here", "to: there" }, {... }]
******************************************************** */
export const updateQuestionAC = (question_code, transitions) => {
  return {
    type: UPDATE,
    payload: { question_code, transitions }
  }
}

/* *****************************************************
   loadAllQuestionsAC()
   Load user's persisted transitions
   Called by NavBar::onComponentDidMount()
******************************************************** */
export const loadAllTransitionsAC = () => {
  console.log("loadAllTransitionsAC()")

  return dispatch => {
    dispatch({ type: LOADING })
    return fetch(`${URL}/transitions/${USER_ID}`)
      .then(response => response.json())
      .then((transitions) => {
        console.log("transitions", transitions)
        return dispatch({ type: LOAD, payload: transitions })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch({ type: ERROR_DB, payload: error })
      });
  }
}

/* *****************************************************
   persistQuestionAC()
   Persists transitions for a question.

   Warning: The following fails b/c store isn't updated before getTransitions() is
            called. You need to pass the "transitons" to persistQuestionAC().
     this.props.dispatch(updateQuestionAC(question_code, transitions))
     this.props.dispatch(persistQuestionAC(question_code, getTransitions(this.props.transitionsRD, question_code))) // BROKEN

   quesion_code - integer
   transitions - array of transitions
******************************************************** */
export const persistQuestionAC = (question_code, transitions) => {
  console.log(`>> persistQuestionAC(${question_code})`)
  console.log("persisting: ", transitions);

  return dispatch => {
    return fetch(`${URL}/transitions/${USER_ID}/${question_code}`, {
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
        return dispatch( { type: NO_OP, payload: message })
      })
      .catch((error) => {
        console.log("POST ERROR", error);
        return dispatch( { type: ERROR_DB, payload: error } )
      });
  }
}
