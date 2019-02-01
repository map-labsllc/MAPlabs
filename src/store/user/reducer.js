
// need to mege with the user info coming from login

import {
  USER_ADD_SECTION,
  USER_UPDATE_CURR_SECTION,
  USER_UPDATE_CURR_SECTION_NO_CHANGE,
  USER_UPDATE_ERROR,
} from './constants'

/*
  userRD: {
    isLoading: true,
    isError: false,
    errorMessage: '',
    orderOfSections: {
      1: [110, 120, 130],
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
    user_id: 1,
    fname: "Sandy",
    lname: "Harrison",
    email: "tharrison@gmail.com",
    login_service_id: 1,
    login_token: "DFDS34543GD",
    curr_module: 4,
    curr_section: 170,
   },
}

/* ***********************************************
   getUser()

   Get object for currently logged in user

   return -- user object
************************************************** */
export const getUser = ( state ) => state.user


/* ***********************************************
   isFirstSection()

   Check if sectionNum is first section in moduleNum

   return -- t/f
************************************************** */
export const isFirstSection = ( state, moduleNum, sectionNum ) => {
  console.log( 'userRD::isFirstSection()' )
  if ( !state.orderOfSections[moduleNum] ) {
    console.log( 'userRD::isFirstSection(), short circuit, unk moduleNum:', moduleNum )
    return false
  }
  return state.orderOfSections[moduleNum].indexOf( sectionNum ) === 0
}


/* ***********************************************
   getNextModuleSection()

   Get the next Module and Section

   return -- { moduleNum, sectionNum }
************************************************** */
export const getNextModuleSection = ( userRD, currModuleNum, currSectionNum ) => {
  console.log( `userRD::getNextModuleSection(state, ${currModuleNum}, ${currSectionNum})` )
  const { orderOfSections } = userRD
  console.log( "orderOfSections: ", orderOfSections )
  const sections = orderOfSections[currModuleNum]
  console.log( "sections: ", sections )

  // TODO: Crashing when current is at 2,0 and we're closing modals in module 1
  // if (userRD.user.curr_module !== currModuleNum) {
  //   return {
  //
  //   }
  // }

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
  // const idx = orderOfSections.findIndex(moduleAndSection =>
  //   moduleAndSection.moduleNum === currModuleNum && moduleAndSection.sectionNum === currSectionNum)

  // console.log('found index: ', idx);
  // console.log('orderOfSections[idx]: ', orderOfSections[idx]);
  // console.log('orderOfSections[idx+1]: ', orderOfSections[idx + 1]);
  // TODO: move to next module if at the end of the array
  //return orderOfSections[idx + 1]
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

    case USER_UPDATE_CURR_SECTION_NO_CHANGE:
      return state

    case USER_UPDATE_ERROR:
      return state

    case USER_ADD_SECTION: {
      const { moduleNum, sectionNum } = payload

      const newOrderOfSections = { ...state.orderOfSections }
      const sections = newOrderOfSections[moduleNum] || []
      if ( !sections.includes( sectionNum ) ) sections.push( sectionNum )
      newOrderOfSections[moduleNum] = sections

      return  {
        ...state,
        orderOfSections: newOrderOfSections,
      }
    }

    default:
      return state
   }
 }

 export default userRD
