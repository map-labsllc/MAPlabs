
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
    orderOfSections: [],   // [ { module: 1, section: 110 }, { module: 1, section: 120 }, { module: 2, section: 210 } ]
    user: {
      user_id: 1,
      fname: "Sandy",
      lname: "Harrison",
      email: "tharrison@gmail.com",
      login_service_id: 1,
      login_token: "DFDS34543GD",
      curr_module: 1,
      curr_section: 120,
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
    curr_module: 1,
    curr_section: 120,
   },
}

/* ***********************************************
   getUser()

   Get object for currently logged in user

   return -- user object
************************************************** */
export const getUser = ( state ) => state.user

/* ***********************************************
   getNextModuleSection()

   Get the next Module and Section

   return -- { moduleNum, sectionNum }
************************************************** */
export const getNextModuleSection = ( state, currModuleNum, currSectionNum ) => {
  console.log('--------------------------------------------');
  console.log('--------------------------------------------');
  console.log('--------------------------------------------');

  console.log(`userRD::getNextModuleSection()`);

  const { orderOfSections } = state

  const idx = orderOfSections.findIndex(moduleAndSection =>
    moduleAndSection.moduleNum === currModuleNum && moduleAndSection.sectionNum === currSectionNum)

  console.log('found index: ', idx);
  console.log('orderOfSections[idx]: ', orderOfSections[idx]);
  console.log('orderOfSections[idx+1]: ', orderOfSections[idx + 1]);
  // TODO: move to next module if at the end of the array
  return orderOfSections[idx + 1]
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
      const newOrderOfSections = [ ...state.orderOfSections, { moduleNum, sectionNum } ]
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
