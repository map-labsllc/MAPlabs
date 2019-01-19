import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
} from '../actions/types'
import {
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED
} from '../actions'

const INITIAL_STATE = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,

}

export default (state = INITIAL_STATE, action) => {
  // console.log(action)

  switch (action.type) {
    case FIRSTNAME_CHANGED:
      return{...state, first_name: action.payload}
    case LASTNAME_CHANGED:
      return{...state, last_name: action.payload}
    case EMAIL_CHANGED:

      return {...state, email: action.payload }
    case PASSWORD_CHANGED:
      return {...state, password: action.payload }
    case LOGIN_USER:
      return {...state, loading: true, error: '' }
    case LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, user: action.payload }
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false }
    default:
      return state
  }
}