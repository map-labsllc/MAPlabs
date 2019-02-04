import firebase from 'firebase'

import {
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  SIGNUP,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,

  USER_ADD_SECTION,
  USER_UPDATE_CURR_SECTION,
  USER_UPDATE_CURR_SECTION_NO_CHANGE,
  USER_UPDATE_ERROR,

} from './constants'

import { getNextModuleSection } from './reducer'

const URL = process.env.REACT_APP_DB_URL

/* ************************************************
    persistCurrModuleAndSection

    Helper to persist the user's new curr_module and curr_section

    distpatch
    user -- user object
    moduleNum -- integer
    sectionNum -- integer
*************************************************** */
const persistCurrModuleAndSection = ( dispatch, user, moduleNum, sectionNum ) => {

  const body = {
    curr_module: moduleNum,
    curr_section: sectionNum,
  }

  console.log( "---- fetching body: ", JSON.stringify( body ) )
  return fetch( `${URL}/users/${user.user_id}`, {
      method: 'PATCH',
      body: JSON.stringify( body ),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    } )
    .then( response => {
      if ( !response.ok ) {
        console.log( "---- error" )
        console.log( "-- FETCH ERROR 1" )
        // TODO: re-test this, doesn't the return just go to the next .then?
        return dispatch( {
          type: USER_UPDATE_ERROR,
          payload: "error" } )
      }
      return response.json()
    } )
    .then( message => {
      console.log( "---- success perisisting to db" )
    } )
    .catch( ( error ) => {
      console.log( "---- error" )
      console.log( "-- FETCH ERROR", error )
      return dispatch( {
        type: USER_UPDATE_ERROR,
        payload: error } )
    } )
  }

/* ************************************************
    sectionLoadingAC

    Called by Section's as they mount.  Builds an array of the order of
      sections for each module to help enforce that user moves forward one
      section at a time.

    moduleNum - integer
    sectionNum
*************************************************** */
export const sectionLoadingAC = ( moduleNum, sectionNum ) => {
  console.log( `---- userRD::sectionLoadingAC(${moduleNum}, ${sectionNum})` )

  return {
    type: USER_ADD_SECTION,
    payload: { moduleNum, sectionNum },
  }
}

/* ************************************************
    sectionCompletedAC

    Called when Popup is closed.  If section completed is the user's current
      section (ie, the furthest they've comleted) then advance the user's
      curr_module and curr_section.

    user -- user object
    completedModuleNum -- module where section is being completed
    completedSectionNum -- section completed

*************************************************** */
export const sectionCompletedAC = ( user, completedModuleNum, completedSectionNum ) => {
  console.log( `---- userRD::sectionCompletedAC(${user.fname}, ${completedModuleNum}, ${completedSectionNum})` )

  return async ( dispatch, getState ) => {

    // DO update the user's curr_module and curr_section
    // -------------------------------------------------
    if ( ( user.curr_module === completedModuleNum )
      && ( user.curr_section === 0 || user.curr_section === completedSectionNum ) ) {

      const nextModuleSectionObj = getNextModuleSection( getState().userRD, user.curr_module, user.curr_section )
      console.log( "---- nextModuleSectionObj advancing to:", nextModuleSectionObj )

      // persist the new curr_module, curr_section
      persistCurrModuleAndSection( dispatch, user, nextModuleSectionObj.moduleNum, nextModuleSectionObj.sectionNum )

      // update store
      return dispatch ( {
        type: USER_UPDATE_CURR_SECTION,
        payload: {
          moduleNum: nextModuleSectionObj.moduleNum,
          sectionNum: nextModuleSectionObj.sectionNum }
      } )

    }

    // DON'T advance the user's current module and section
    // ---------------------------------------------------
    console.log( "---- no change" )
    return dispatch ( {
      type: USER_UPDATE_CURR_SECTION_NO_CHANGE,
      payload: { }
    } )
  }
}


/* ************************************************

*************************************************** */
export const firstNameChanged = ( text ) => {
  return {
    type: FIRSTNAME_CHANGED,
    payload: text
  }
}

export const lastNameChanged = ( text ) => {
  return {
    type: LASTNAME_CHANGED,
    payload: text
  }
}

export const emailChanged = ( text ) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = ( text ) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ( { email, password } ) => {
  return async ( dispatch ) => {
    console.log( dispatch )
    dispatch( { type: LOGIN_USER } )

    firebase.auth().signInWithEmailAndPassword( email, password )
      .then( user => {
        console.log( 'user ball', user )
        loginUserSuccess( dispatch, user )
      } )
      .catch( function(){
        loginUserFail( dispatch )
      } )
  }
}

export const signUp = () => {
  return async ( dispatch ) => {
    console.log( dispatch,'signup' )
    dispatch.signUp()
  }
}
export const signUpUser = ( firstName, lastName, email, password ) => {
  let body = {
    fname: firstName,
    lname: lastName,
    email: email,
    token: password,
    uri: ''
  }
  return async ( dispatch ) => {
      console.log( 'this disBATCH', dispatch )
        await firebase.auth().createUserWithEmailAndPassword( email, password )
          .then( user => loginUserSuccess( dispatch, user ) )
           firebase.auth().onAuthStateChanged( ( user ) => {
            if ( user ) {
              console.log( 'in here duuuuuude' )
              body.token = user.uid


            }
          } )
          dispatch( {
            type: SIGNUP,
            payload:body
          } )
  }
}
//
// export const loadLifeDescriptorsAC = () => {
//   console.log('action!!!');
//   dispatch({
//     type: LOAD_LIFE_DESCRIPTORS
//   })
// }

const loginUserFail = ( dispatch ) => {
  dispatch( {
    type: LOGIN_USER_FAIL
  } )
}

const loginUserSuccess = ( dispatch, user ) => {
  console.log( 'user is in the HOUSE',user )
  dispatch( {
    type: LOGIN_USER_SUCCESS,
    payload: user
  } )
dispatch.main()
}
