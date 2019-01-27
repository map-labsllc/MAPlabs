
// need to mege with the user info coming from login

import {
  USER_UPDATE_CURR_SECTION,
  USER_UPDATE_CURR_SECTION_NO_CHANGE,
  USER_UPDATE_ERROR,
} from './constants'

/*
  userRD: {
    isLoading: true,
    isError: false,
    errorMessage: '',
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
//This should be replaced with directly mapping state.user to props in container //components
export const getUser = ( state ) => state.user


 /* ***********************************************
    userRD
 ************************************************** */
 export const userRD = ( state = initialState, action ) => {

  const { type, payload } = action

  switch( type ) {

    case USER_UPDATE_CURR_SECTION:
      const { moduleNum, sectionNum } = payload
      return {
        ...state,
        curr_module: moduleNum,
        curr_section: sectionNum,
      }

    case USER_UPDATE_CURR_SECTION_NO_CHANGE:
      return state

    case USER_UPDATE_ERROR:
      return state

    default:
      return state
   }
 }

 export default userRD
