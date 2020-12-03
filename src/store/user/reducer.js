// need to mege with the user info coming from login

import {
  AUTH_CHECK_COMPLETE,
  EMAIL_CHANGED,
  FIRSTNAME_CHANGED,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD,
  LASTNAME_CHANGED,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
  LOGOUT,
  PASSWORD_CHANGED,
  REMOVE_TOKEN,
  SIGNUP_FAIL,
  SIGNUP,
  USER_UPDATE_CURR_SECTION_NO_CHANGE,
  USER_UPDATE_CURR_SECTION,
  USER_UPDATE_ERROR,
  USER_UPDATE_SUCCESS,
} from './constants'

import { MODULES } from '../../Components/Modules/ModuleData'

const LOGIN_TOKEN_LENGTH = 28;

/*

  THIS IS THE SHAPE, DON'T UNCOMMMENT

  userRD: {
    isLoading: true,
    errorMessage: '',
    orderOfSections: {     // this is lazy loaded as Module#.js files are loaded and sections are built
      1: [110, 120, 130],  // TODO: shouldn't this be its own reducer?
      2: [210, 220, 230, 240],
    }
    user: {
      id: 1,
      fname: "Sandy",
      lname: "Harrison",
      email: "tharrison@gmail.com",
      login_service_id: 1,
      login_token: "DFDS34543GD",
      curr_module: 2,
      curr_section: 0,
      created_at: 2019-01-15 04:00:00-07
     },
  }
*/

const sectionIdsByModId = MODULES.reduce((acc, mod) => {
  acc[mod.id] = mod.sections.map(section => section.id) // hash section ids by module id
  return acc
}, [])

// ------------------------------------------
let initialState = {
  authCheckPending: true,
  isLoading: false, // change to true when we connect with login process
  errorMessage: '',
  message: '',
  orderOfSections: sectionIdsByModId,
  user: {}
}

/* ***********************************************
   getUser()

   Get object for currently logged in user

   return -- user object
************************************************** */
export const getUser = (state) => state.user

/* ***********************************************
   isLoggedIn()

   Check if user is logged in / authorized

   return -- t/f
************************************************** */
export const isLoggedIn = (state) => state.user && state.user.login_token && state.user.login_token.length === LOGIN_TOKEN_LENGTH

/* ***********************************************
   isFirstSection()

   Check if sectionNum is first section in moduleNum.
     Note: only check when the sections of the module have been loaded (ie you
           can't check random modules, just the one you're in.)

   return -- t/f
************************************************** */
export const isFirstSection = (state, moduleNum, sectionNum) => {
  // check if sectionNum is the first entry in array of sections for the module in question
  return state.orderOfSections[moduleNum].indexOf(sectionNum) === 0
}

/* ***********************************************
   getNextModuleSection()

   Get the next Module and Section

   userRD -- user reducer
   currModuleNu -- integer
   currSectionNum -- integer

   return -- { moduleNum, sectionNum }
************************************************** */
export const getNextModuleSection = (userRD, currModuleNum, currSectionNum) => {
  const { orderOfSections } = userRD
  const sections = orderOfSections[currModuleNum]

  const idx = sections.indexOf(currSectionNum) || 0

  let newModuleNum = currModuleNum
  let newSectionNum = 0
  if (idx < sections.length - 1) {
    newSectionNum = sections[idx + 1]
  } else {
    newModuleNum = currModuleNum + 1
    newSectionNum = 0
  }

  return {
    moduleNum: newModuleNum,
    sectionNum: newSectionNum,
  }
}

// is this module the user's current section
export const isCurrentSection = (currentModule, moduleNum, currentSection, sectionNum) => currentModule === +moduleNum && currentSection === +sectionNum

// can we show the next section
export const showNextSection = (currentModule, moduleNum, currentSection, sectionNum) => (currentModule > +moduleNum ||
    (currentModule === +moduleNum && currentSection > +sectionNum))

/* ***********************************************
  userRD
************************************************** */
export const userRD = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
  case AUTH_CHECK_COMPLETE:
    return { ...state, authCheckPending: false }

  case USER_UPDATE_CURR_SECTION: {
    const { moduleNum, sectionNum } = payload
    const newUser = {
      ...state.user,
      curr_module: moduleNum,
      curr_section: sectionNum,
    }
    return {
      ...state,
      user: newUser,
    }
  }
  case FIRSTNAME_CHANGED:
    const user = {
      ...state.user,
      fname: payload,
    }
    return { ...state, user }
  case LASTNAME_CHANGED:
    const last = {
      ...state.user,
      lname: payload,
    }
    return { ...state, user: last }
  case EMAIL_CHANGED:
    const email = {
      ...state.user,
      email: payload,
    }
    return { ...state, user: email }
  case PASSWORD_CHANGED:
    const password = {
      ...state.user,
      password: payload
    }
    return { ...state, user: password }

  case LOGIN_USER:
    return {
      ...state, loading: true, errorMessage: '', message: ''
    }

  case USER_UPDATE_SUCCESS:
  case LOGIN_USER_SUCCESS:
    return { ...state, user: { ...payload }, loading: false }

  case LOGIN_USER_FAIL:
    return {
      ...state, user: {}, errorMessage: 'Authentication Failed. Please check username/password.', password: '', loading: false
    }
  case FORGOT_PASSWORD:
    return {
      ...state, loading: true, errorMessage: '', message: ''
    }
  case FORGOT_PASSWORD_SUCCESS:
    return {
      ...state, loading: false, errorMessage: '', message: 'Please check your email for reset instructions.'
    }
  case FORGOT_PASSWORD_FAIL:
    return {
      ...state, loading: false, errorMessage: payload.errorMessage, message: ''
    }
  case USER_UPDATE_CURR_SECTION_NO_CHANGE:
    return state
  case USER_UPDATE_ERROR:
    return state
  case LOGOUT: {
    return { ...state, user: {}, errorMessage: '' }
  }
  case SIGNUP: {
    return {
      ...state, loading: true, message: '', errorMessage: ''
    }
  }
  case SIGNUP_FAIL: {
    return { ...state, loading: false, errorMessage: payload.errorMessage }
  }
  case REMOVE_TOKEN: {
    return { ...state, user: { ...user, login_token: undefined } }
  }
  default:
    return state
  }
}

export default userRD
