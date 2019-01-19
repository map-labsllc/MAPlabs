import {
  LOADING,
  LOAD,
  ERROR_DB,
} from './constants'

const URL = "http://localhost:3001"

/* *****************************************************
   loadAllAnswersAC()
   Load user's persisted answers, called by NavBar::onComponentDidMount()
******************************************************** */
export const loadAllAnswersAC = () => {
  console.log("loadAnswersAC()")

  return dispatch => {
    dispatch({ type: LOADING })
    return fetch(`${URL}/answers/1`)
      .then(response => response.json())
      .then((answers) => {
        console.log("answers", answers)
        return dispatch({ type: LOAD, payload: answers })
      })
      .catch((error) => {
        console.log("FETCH ERROR", error);
        return dispatch( { type: ERROR_DB, payload: error } )
      });
  }
};

/* *****************************************************
   persistQuestionAC()
   Persists answers for a question
******************************************************** */
export const persistQuestionAC = (question_code) => {
  console.log(`persistQuestionAC(${question_code})`)

  return dispatch => {

    return fetch(`${URL}/answers/1`)
      .then(response => response.json())
      .then((answers) => {
        console.log("answers", answers)
      })
      .catch((error) => {
        console.log("POST ERROR", error);
        return dispatch( { type: ERROR_DB, payload: error } )
      });
  }


  // return dispatch => {
  //   // see addCommentAC for a try/catch asynch/await implemetation
  //   fetch('http://localhost:8082/api/posts', {
  //     method: 'POST',
  //     body: JSON.stringify(newPost),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //   .then(response => response.json())
  //   .then(newPost => dispatch({
  //     type: ADD_POST,
  //     newPost
  //     })
  //   )
  //   .catch((error) => {
  //     console.log("FETCH ERROR LOADING POSTS: ", error);
  //     return dispatch(notifyFetchErrorOccurredAC(error, "addPostAC()", "Unable to save the new post"));
  //   })
  // }





};
