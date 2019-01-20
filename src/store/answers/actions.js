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
   Update answers for a question in state.
   Will replace any other answers for the question.
   Call persistQuestionAC() to save to database.

   quesion_code - integer
   answers - array of answer strings
******************************************************** */
export const updateQuestionAC = (question_code, answers) => {
  return {
    type: UPDATE,
    payload: { question_code, answers }
  }
}

/* *****************************************************
   loadAllQuestionsAC()
   Load user's persisted answers for all questions
   Called by NavBar::onComponentDidMount()
******************************************************** */
export const loadAllQuestionsAC = () => {
  console.log("loadAllQuestionsAC()")

  return dispatch => {
    dispatch({ type: LOADING })
    return fetch(`${URL}/answers/${USER_ID}`)
      .then(response => response.json())
      .then((answers) => {
        console.log("answers", answers)
        return dispatch({ type: LOAD, payload: answers })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch({ type: ERROR_DB, payload: error })
      });
  }
}

/* *****************************************************
   persistQuestionAC()
   Persists answers for a question.

   Warning: The following fails b/c store isn't updated before getAnswers() is
            called. You need to pass the "answers" to persistQuestionAC().
     this.props.dispatch(updateQuestionAC(question_code, answers))
     this.props.dispatch(persistQuestionAC(question_code, getAnswers(this.props.answersRD, question_code))) // BROKEN

   quesion_code - integer
   answers - array of answer strings
******************************************************** */
export const persistQuestionAC = (question_code, answers) => {
  console.log(`>> persistQuestionAC(${question_code})`)
  console.log("persisting: ", answers);

  return dispatch => {
    return fetch(`${URL}/answers/${USER_ID}/${question_code}`, {
        method: 'POST',
        body: JSON.stringify({ answers }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(response => response.json())
      .then((message) => {
        console.log("post response message", message)
        return dispatch( { type: NO_OP })
      })
      .catch((error) => {
        console.log("POST ERROR", error);
        return dispatch( { type: ERROR_DB, payload: error } )
      });
  }
}
