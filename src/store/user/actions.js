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

const URL = "http://localhost:3001"
// const URL = process.env.REACT_APP_DB_URL
// http PATCH localhost:3001/users/1 curr_module=2 curr_section=1

/* ************************************************
    sectionLoadingAC

    Called by Section's as they mount.  Builds an array of the order of
      modules and sections to help enforce that user moves forward one
      section at a time.
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

*************************************************** */
export const sectionCompletedAC = ( user, moduleNum, sectionNum ) => {
  console.log( `---- userRD::sectionCompletedAC(${user.fname}, ${moduleNum}, ${sectionNum})` )

  return async ( dispatch, getState ) => {

    // don't advance the user's current module and section
    console.log( "---- starting" )
    if ( user.curr_module !== moduleNum || user.curr_section !== sectionNum ) {
      console.log( "---- no change" )
      return dispatch ( {
        type: USER_UPDATE_CURR_SECTION_NO_CHANGE,
        payload: { }
      } )
    }

    // advance the user's furthest module and section because they just
    //   completed their furthest section
    const nextModuleSectionObj = getNextModuleSection( getState().userRD, user.curr_module, user.curr_section )
    console.log( "---- nextModuleSectionObj:", nextModuleSectionObj )

    // udate it immediately
    dispatch ( {
      type: USER_UPDATE_CURR_SECTION,
      payload: {
        moduleNum: nextModuleSectionObj.moduleNum,
        sectionNum: nextModuleSectionObj.sectionNum }
    } )

    console.log( "---- fetching" )
    const body = {
      curr_module: nextModuleSectionObj.moduleNum,
      curr_section: nextModuleSectionObj.sectionNum,
    }
    return fetch( `${URL}/users/${user.user_id}`, {
        method: 'PATCH',
        body: JSON.stringify( body ),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      } )
      .then( response => response.json() )
      .then( message => {
        console.log( "---- success perisisting to db" )
        // return dispatch ( {
        //   type: USER_UPDATE_CURR_SECTION,
        //   payload: {
        //     moduleNum: nextModuleSectionObj.moduleNum,
        //     sectionNum: nextModuleSectionObj.sectionNum }
        // } )
      } )
      .catch( ( error ) => {
        console.log( "---- error" )
        console.log( "-- FETCH ERROR", error )
        return dispatch( {
          type: USER_UPDATE_ERROR,
          payload: error } )
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
    first_name: firstName,
    last_name: lastName,
    email: email,
    token: password,
    uri: ''
  }
  return async ( dispatch ) => {
        await firebase.auth().createUserWithEmailAndPassword( email, password )
          .then( user => loginUserSuccess( dispatch, user ) )
          firebase.auth().onAuthStateChanged( ( user ) => {
            if ( user ) {
              console.log( 'in here duuuuuude' )
              body.token = user.uid


            }
          } )
          dispatch( {type: SIGNUP} )
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
  dispatch( {
    type: LOGIN_USER_SUCCESS,
    payload: user
  } )
dispatch.main()
}
