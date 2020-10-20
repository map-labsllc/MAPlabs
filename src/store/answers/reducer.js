import {
  ANSWERS_LOADING,
  ANSWERS_LOAD,
  ANSWERS_UPDATE,
  ANSWERS_ERROR_DB,
  ANSWERS_PERSIST,
} from './constants'

/*
  answersRD: {
    isLoading: true,
    isError: false,
    errorMessage: '',
    questions: {
      1: [ [ 'narrative, so only one answer', '', '', '', '', '' ] ],
      2: [ [ 'east', 'west', '','' ], [ 'top', 'bottom', '','', '', '' ] },
      3: [ [ 'short 1', '', '','' ], [ 'short 2', '', '','', '', '' ] },
      4: [ ... ]
    },
  }
*/

const initialState = {
  isLoading: true, // assume we're loading
  isError: false,
  errorMessage: '',
  questions: {},
}

// helpers for switching between array and object format
export const hydrater = (shape) => {
  // shape = {key: attr, ...}
  return (answer) => (
    // answer = ['value1', 'value2']
    Object.keys(shape).reduce((obj, key) => {
      let attr = shape[key]
      obj[attr] = answer[key]
      return obj
    }, {})
  )
}

export const dehydrater = (shape) => {
  // shape = {key: attr, ...}
  return (item) => (
    // item = {attr1: value1, attr2: value2}
    Object.keys(shape).reduce((arr, key) => {
      let attr = shape[key]
      arr[key] = item[attr]
      return arr
    }, [])
  )
}


/* ***********************************************
   getAnswers()

   Get 2D array of strings for a given question_code

   state -- answersRD (this reducer, not the entire store)
   question_code -- integer

   return array of array of answer strings or []
************************************************** */
export const getAnswers = ( state, question_code ) =>
  state.questions[question_code] || []

 /* ***********************************************
    answersRD
 ************************************************** */
 export const answersRD = ( state = initialState, action ) => {

  const { type, payload } = action

  switch( type ) {

    // Reset the reducer to initial state, could be
    //   used when switching users.
    case ANSWERS_LOADING:
      // console.log( "answersRD::LOADING" )
      return initialState

    // Payload, 2D array of strings:
    //  {
    //    1: [ [ 'narrative, so only one answer' ] ],
    //    2: [ [ 'from', 'to' ],
    //         [ 'east', 'west' ]
    //       ]
    //  }
    case ANSWERS_LOAD:
      // console.log( "answersRD::LOAD" )
      return {
        ...state,
        isLoading: false,
        questions: payload,
      }

    // Payload: todo: add example
    case ANSWERS_UPDATE:
      // console.log( "answersRD::UPDATE" )
      const newQuestions = { ...state.questions }
      newQuestions[payload.question_code] = payload.answers
      return {
        ...state,
        questions: newQuestions,
      }

    // Fetch error
    case ANSWERS_ERROR_DB:
      console.log( "answersRD::ERROR_DB" )
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload || "Error fetching answers",
      }

      // answers for a question were successfully persisted
      case ANSWERS_PERSIST:
        console.log( "answersRD::PERSIST" )
        return state

    default:
      return state
   }
 }

 export default answersRD
