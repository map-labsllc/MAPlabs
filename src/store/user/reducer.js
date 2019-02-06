
// need to mege with the user info coming from login

import {
  USER_ADD_SECTION,
  USER_UPDATE_CURR_SECTION,
  USER_UPDATE_CURR_SECTION_NO_CHANGE,
  USER_UPDATE_ERROR,
  SIGNUP,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './constants'

/*
  userRD: {
    isLoading: true,
    isError: false,
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

const initialState = {
  isLoading: false,  // change to true when we connect with login process
  isError: false,
  errorMessage: '',
  orderOfSections: [],
  user: {
    user_id: 0,
    fname: "",
    lname: "",
    email: "",
    password: "",
    login_service_id: 0,
    token: "",
    curr_module: -1,
    curr_section: 0,
   },
// const initialState = {
//   isLoading: false,  // change to true when we connect with login process
//   isError: false,
//   errorMessage: '',
//   orderOfSections: [],
//   user: {
//     user_id: 1,
//     fname: "",
//     lname: "",
//     email: "",
//     password: "",
//     login_service_id: 1,
//     token: "",
//     curr_module: 4,
//     curr_section: 0,
//    },
}

/* ***********************************************
   getUser()

   Get object for currently logged in user

   return -- user object
************************************************** */
export const getUser = ( state ) => state.user


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
  return{...state, user}
  case LASTNAME_CHANGED:
    let last = {
      ...state.user,
      lname: payload,
    }
  return{...state, user:last}
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
  return {...state, loading: true, error: '' }
case LOGIN_USER_SUCCESS:

  return {...state, user: {...payload} }
case LOGIN_USER_FAIL:
  return { ...state, error: 'Authentication Failed.', password: '', loading: false }
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
    case SIGNUP: {


      return {...state, loading: true, error: '' }
    }

    default:
      return state
   }

 }

 export default userRD
