import {
  ANSWERS_LOADING,
  ANSWERS_LOAD,
  ANSWERS_ERROR_DB,
  ANSWERS_UPDATE,
  ANSWERS_PERSIST,
} from './constants'

import { REMOVE_TOKEN } from '../user/constants'
import { getUserJwt } from '../user/actions'
import { getUser } from '../user/reducer'
import { getAnswers } from './reducer'

const URL = process.env.REACT_APP_DB_URL

/* redirect errors from API to auth */
const redirectFirebaseErrors = (dispatch, error) => {
  if (error.message && error.message.match(/Firebase|Unauthorized/)) {
    console.error('Firebase Auth error')
    // log them out
    dispatch({ type: REMOVE_TOKEN })
  } else {
    console.error('FETCH ANSWERS ERROR', error.message)
    dispatch({ type: ANSWERS_ERROR_DB, payload: error.message })
    // dispatch({ type: REMOVE_TOKEN }) // hack, since this is most likely due to firebase auth
  }
}

/* *****************************************************
   updateAnswersAC()

   Update answers for a question in state.
   Will replace any other answers for the question.
   Call persistQuestionAC() if you want to persist to database.

   quesion_code - integer
   answers - array of answer strings
******************************************************** */
export const updateAnswersAC = (question_code, answers) => ({
    type: ANSWERS_UPDATE,
    payload: { question_code, answers },
  })

/* *****************************************************
   loadAllAnswersAC()

   Load user's persisted answers for all questions
   Called by NavBar::onComponentDidMount()

   userId
******************************************************** */
export const loadAllAnswersAC = (userId) => {
  console.log('loadAllAnswersAC()', userId)

  return async dispatch => {
    dispatch({ type: ANSWERS_LOADING })
    const jwtGetter = getUserJwt()
    const jwt = await jwtGetter(dispatch)

    if (!userId || !jwt) {
      console.error('Attempting to get answers without ids: userId, jwt', userId, jwt)
      return
    }

    return fetch(`${URL}/answers/${userId}`, {
        headers: { Authorization: `Token: ${jwt}` }
      })
      .then(response => {
        
        if (response.ok)
        {
          return response.json()        
        }

        throw new Error(response.statusText)
      })
      .then(answers => {
        console.log('answers', answers)
        dispatch({ type: ANSWERS_LOAD, payload: answers })
      } )
      .catch((error) => {
        redirectFirebaseErrors(dispatch, error)
      })
  }
}

/* *****************************************************
   persistAnswersAC()

   Persists answers for a question.

   Warning: The following example fails b/c store isn't updated before getAnswers() is
            called. You need to pass 'answers' directly to persistQuestionAC().

     this.props.dispatch(updateAnswersAC(question_code, answers))
     // BROKEN: this.props.dispatch(persistAnswersAC(question_code, getAnswers(this.props.answersRD, question_code)))

   userId
   quesion_code - integer
   question_type -- integer from ./contants.js
   answers - 2D array of up to four strings each
                [ [ 'ans1', 'ans2', 'ans3, 'ans4', 'ans5', 'ams6'], [...] ]
             Note:  only need to supply as many strings as are used, ex:
                [ [ 'narrative' ] ]
******************************************************** */
export const persistAnswersAC = ( userId, question_code, question_type, answers ) => {
  console.log( `persistAnswersAC(${question_code}, ${question_type})`, answers )

  return async dispatch => {
    const jwtGetter = getUserJwt()
    const jwt = await jwtGetter(dispatch)

    if (!userId || !question_code || !question_type) {
      console.error('Attempting to peristAnswer without ids: userId, question_code, question_type', userId, question_code, question_type)
      return
    }

    return fetch(`${URL}/answers/${userId}/${question_code}/${question_type}`, {
        method: 'POST',
        body: JSON.stringify( { answers } ),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token: ${jwt}`
        },
      } )
      .then(response => {
        if (response.ok) {
          return response.json()        
        }

        throw new Error(response.statusText)
      })
      .then(message => {
        console.log('post response message', message)
        dispatch({ type: ANSWERS_PERSIST })
      } )
      .catch(error => redirectFirebaseErrors(dispatch, error))
  }
}

/* copy parent answers to current question helper */
export const copyParentAnswers = (question, promptQuestionCode, type) => async(dispatch, getState) => {
    const state = getState()

    // get userId
    const userId = getUser(state.userRD).id

    // get parent answers
    const parentAnswers = getAnswers(state.answersRD, promptQuestionCode)
    // console.log('parentAnswers', parentAnswers)

    await dispatch(updateAnswersAC(question.code, parentAnswers))
    await dispatch(persistAnswersAC(userId, question.code, type, parentAnswers))
  }
