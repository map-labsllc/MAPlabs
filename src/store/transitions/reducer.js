import {
  TRANSITIONS_LOADING,
  TRANSITIONS_LOAD,
  TRANSITIONS_UPDATE,
  TRANSITIONS_PERSIST,
  TRANSITIONS_ERROR_DB,
 } from './constants'

/*
  transitionsRD: {
    isLoading: true,
    isError: false,
    errorMessage: '',
    questions: {
      52: [ { from: 'here', to: 'there' },
            { form: 'good', to: 'bad' } ],
      76: [ { from: 'north', to: 'south' },
            { form: 'east', to: 'west' } ],
    }
  }
*/

const initialState = {
  isLoading: true,
  isError: false,
  errorMessage: '',
  questions: {},
}

/* ***********************************************
   getTranstions()
   Get array of transitions for a given question_code

   param store -- state of the reduser
   param question_code -- integer

   return array of transitions or empty array -- [ { from: 'here', to: 'there' }, ... ]
************************************************** */
export const getTransitions = ( state, question_code ) =>
  state.questions[question_code] || []


/* ***********************************************
  transitionsRD
************************************************** */
export const transitionsRD = ( state = initialState, action ) => {

  const { type, payload } = action

  switch( type ) {

    // Reset the reducer to initial state, could be
    //   used when switching users.
    case TRANSITIONS_LOADING:
      console.log( "transitionsRD::LOADING" )
      return initialState

    // Payload :
    // {
    //    52: [ { from: 'here', to: 'there' },
    //          { form: 'good', to: 'bad' } ],
    //    76: [ { from: 'north', to: 'south' },
    //          { form: 'east', to: 'west' } ],
    //  }
    case TRANSITIONS_LOAD:
      console.log( "transitionsRD::LOAD" )
      return {
        ...state,
        isLoading: false,
        questions: payload,
      }

    // Payload
    //   { question_code: 6,
    //     transitons: [ { from: 'here', to: 'there' }, { ... } ] }
    case TRANSITIONS_UPDATE:
      console.log( "transitionsRD::UPDATE" )
      const newQuestions = { ...state.questions }
      newQuestions[payload.question_code] = payload.transitions
      return {
        ...state,
        questions: newQuestions,
      }

    // Fetch error
    case TRANSITIONS_ERROR_DB:
      console.log( "transitionsRD::ERROR_DB" )
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload || "no error message provided",
      }

      // transitions for a question were persisted
      case TRANSITIONS_PERSIST:
        console.log( "transitionsRD::PERSIST" )
        return state

    default:
      return state
   }
 }

 export default transitionsRD
