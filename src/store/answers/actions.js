import {
  ANSWERS_LOADING,
  ANSWERS_LOAD,
  ANSWERS_ERROR_DB,
  ANSWERS_UPDATE,
  ANSWERS_NO_OP,
} from './constants'

const URL = "http://localhost:3001"
// const URL = process.env.DB_URL
const USER_ID = 1

/* *****************************************************
   updateAnswersAC()

   Update answers for a question in state.
   Will replace any other answers for the question.
   Call persistQuestionAC() to save to database.

   quesion_code - integer
   answers - array of answer strings
******************************************************** */
export const updateAnswersAC = (question_code, answers) => {
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
export const loadAllAnswersAC = (userId) => {
  console.log("loadAllAnswersAC()")

  userId = USER_ID

  return dispatch => {
    dispatch({ type: ANSWERS_LOADING })
    return fetch(`${URL}/answers/${userId}`)
      .then(response => response.json())
      .then((answers) => {
        // console.log("answers", answers)
        return dispatch({ type: ANSWERS_LOAD, payload: answers })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch({ type: ANSWERS_ERROR_DB, payload: error })
      });
  }
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
export const persistAnswersAC = (userId, question_code, answers) => {
  console.log(`persistAnswersAC(${question_code})`)
  console.log("persisting: ", answers);

  userId = USER_ID

  return dispatch => {
    return fetch(`${URL}/answers/${userId}/${question_code}`, {
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
        return dispatch( { type: ANSWERS_NO_OP })
      })
      .catch((error) => {
        console.log("POST ERROR", error);
        return dispatch( { type: ANSWERS_ERROR_DB, payload: error } )
      });
  }
}
