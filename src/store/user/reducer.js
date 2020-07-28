// need to mege with the user info coming from login

import {
  AUTH_CHECK_COMPLETE,
  EMAIL_CHANGED,
  FIRSTNAME_CHANGED,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  LASTNAME_CHANGED,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  PASSWORD_CHANGED,
  SIGNUP,
  SIGNUP_FAIL,
  USER_ADD_SECTION,
  USER_UPDATE_CURR_SECTION,
  USER_UPDATE_CURR_SECTION_NO_CHANGE,
  USER_UPDATE_ERROR,
} from './constants'

/*

  THIS IS THE SHAPE, DON'T UNCOMMMENT

  userRD: {
    isLoading: true,
    errorMessage: '',

    orderOfSections: {     // this is lazy loaded as Module#.js files are loaded and sections are built
      1: [110, 120, 130],  // FUTURE: shouldn't this be its own reducer?
      2: [210, 220, 230, 240],
    }
    user: {
      user_id: 1,
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

let initialState = {}

// true: go through auth
// false: backdoor / bypass auth and auto-login with mock user
if (false) {

  // Blank user will start app in auth mode
  // --------------------------------------
  initialState = {
    isLoading: false,  // change to true when we connect with login process g
    errorMessage: '',
    orderOfSections: [],
    user: {
      user_id: 0,
      fname: "",
      lname: "",
      email: "",
      password: "",  // can we remove this?
      login_service_id: 0,
      login_token: "",
      curr_module: -1,
      curr_section: 0,
    }
  }
} else {

  // ------------------------------------------
  initialState = {
    authCheckPending: true,
    isLoading: false,  // change to true when we connect with login process
    errorMessage: '',
    message: '',
    orderOfSections: [],
    user: {}
  }
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
export const isLoggedIn = (state) => state.user && !!state.user.login_token


/* ***********************************************
   isFirstSection()

   Check if sectionNum is first section in moduleNum.
     Note: only check when the sections of the module have been loaded (ie you
           can't check random modules, just the one you're in.)

   return -- t/f
************************************************** */
export const isFirstSection = ( state, moduleNum, sectionNum ) => {
  console.log( 'userRD::isFirstSection()' )
  // We should only be getting inquiries for Modules that have been loaded and thus
  //   have a key/value pair in orderOfSections.  However some timing issue
  //   with loading leads to this being called before the first section loads SOMETIMES!
  if ( !state.orderOfSections[moduleNum] ) {
    console.log( 'userRD::isFirstSection(), short circuit, unk moduleNum:', moduleNum )
    return false
  }

  // check if sectionNum is the first entry in array of sections for the module in question
  return state.orderOfSections[moduleNum].indexOf( sectionNum ) === 0
}


/* ***********************************************
   getNextModuleSection()

   Get the next Module and Section

   userRD -- user reducer
   currModuleNu -- integer
   currSectionNum -- integer

   return -- { moduleNum, sectionNum }
************************************************** */
export const getNextModuleSection = ( userRD, currModuleNum, currSectionNum ) => {

  const { orderOfSections } = userRD
  const sections = orderOfSections[currModuleNum]

  console.log( `userRD::getNextModuleSection(state, ${currModuleNum}, ${currSectionNum})` )
  console.log( "  orderOfSections: ", orderOfSections )
  console.log( "  sections: ", sections )

  // Properly set currSectionNum to the first section if it was 0.
  //   It was set to 0 when moving forward from last Module at which time
  //   we didn't know the first section number of the next module.
  if ( currSectionNum === 0 )
    currSectionNum = sections[0]

  const idx = sections.indexOf( currSectionNum )

  let newModuleNum = currModuleNum
  let newSectionNum = 0
  if ( idx < sections.length - 1 ) {
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

/* ***********************************************
  userRD
************************************************** */
export const userRD = ( state = initialState, action ) => {
  const { type, payload } = action

  switch( type ) {
    case AUTH_CHECK_COMPLETE:
      return {...state, authCheckPending: false}
      
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
      let user = {
        ...state.user,
        fname: payload,
      }
      return {...state, user}
    case LASTNAME_CHANGED:
      let last = {
        ...state.user,
        lname: payload,
      }
      return {...state, user:last}
    case EMAIL_CHANGED:
      let email = {
        ...state.user,
        email: payload,
      }
      return {...state, user:email }
    case PASSWORD_CHANGED:
      let password = {
        ...state.user,
        password:payload
      }
      return {...state, user:password}
    case LOGIN_USER:
      return {...state, loading: true, errorMessage: '', message: '' }
    case LOGIN_USER_SUCCESS:
      return {...state, user: {...payload}, loading: false }
    case LOGIN_USER_FAIL:
      return { ...state, user: {}, errorMessage: 'Authentication Failed. Please check username/password.', password: '', loading: false }
    case FORGOT_PASSWORD:
      return {...state, loading: true, errorMessage: '', message: '' }
    case FORGOT_PASSWORD_SUCCESS:
      return {...state, loading: false, errorMessage: '', message: 'Please check your email for reset instructions.' }
    case FORGOT_PASSWORD_FAIL:
      return { ...state, loading: false, errorMessage: payload.errorMessage, message: '' }
    case USER_UPDATE_CURR_SECTION_NO_CHANGE:
      return state
    case USER_UPDATE_ERROR:
      return state
    case USER_ADD_SECTION: {
      const { moduleNum, sectionNum,  } = payload
      const newOrderOfSections = { ...state.orderOfSections }
      const sections = newOrderOfSections[moduleNum] || []
      if ( !sections.includes( sectionNum ) ) sections.push( sectionNum )
        newOrderOfSections[moduleNum] = sections
      return  {
        ...state,
        orderOfSections: newOrderOfSections,
      }
    }
    case LOGOUT: {
      return {...state, user: {}, errorMessage: '' }
    }
    case SIGNUP: {
      return {...state, loading: true, message: '', errorMessage: '' }
    }
    case SIGNUP_FAIL: {
      return {...state, loading: false, errorMessage: payload.errorMessage }
    }
    default:
      return state
    }
  }

export default userRD
