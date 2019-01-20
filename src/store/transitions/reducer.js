import {
  LOADING,
  LOAD,
  UPDATE,
  ERROR_DB,
  NO_OP,
 } from './constants';

/*
  transitionsRD: {
    isLoading: true,
    errorDB: false,
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
  errorDB: false,
  errorMessage: '',
  questions: {},
}

/* ***********************************************
   getTranstions()
   Get array of transitions for a given question_code

   param store -- state of the reduser
   param question_code -- integer

   return array of transitions or empty array
************************************************** */
export const getTransitions = (state, question_code) =>
  state.questions[question_code] || []

 /* ***********************************************
    transitionsRD
 ************************************************** */
 export const transitionsRD = (state = initialState, action) => {

  const { type, payload } = action

  switch(type) {

    // Reset the reducer to initial state, could be
    //   used when switching users.
    case LOADING:
      console.log("transitionsRD::LOADING");
      return initialState;

    // Payload :
    // {
    //    52: [ { from: 'here', to: 'there' },
    //          { form: 'good', to: 'bad' } ],
    //    76: [ { from: 'north', to: 'south' },
    //          { form: 'east', to: 'west' } ],
    //  }
    case LOAD:
      console.log("transitionsRD::LOAD");
      return {
        ...state,
        isLoading: false,
        questions: payload,
      };

    // Payload
    //   { question_code: 6,
    //     transitons: [ { from: 'here', to: 'there' }, { ... } ] }
    case UPDATE:
      console.log("transitionsRD::UPDATE");
      const newQuestions = { ...state.questions };
      newQuestions[payload.question_code] = payload.transitions
      return {
        ...state,
        questions: newQuestions,
      };

    // Fetch error
    case ERROR_DB:
      console.log("transitionsRD::ERROR_DB");
      return {
        ...state,
        isLoading: false,
        errorDB: true,
        errorMessage: payload || "no error message provided",
      }

      // no operation, AC didn't change stat
      case NO_OP:
        console.log("answersRD::NO_OP")
        return state

    default:
      return state
   }
 }

 export default transitionsRD
