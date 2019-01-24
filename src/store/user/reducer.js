
// need to mege with the user info coming from login

import {

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
      curr_section: 1,
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
    mod_complete: 0,
    sec_complete: 0,
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

    default:
      return state
   }
 }

 export default userRD
