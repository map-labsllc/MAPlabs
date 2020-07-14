import firebase from 'firebase'

import {
  EMAIL_CHANGED,
  FIRSTNAME_CHANGED,
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

import { getNextModuleSection } from './reducer'

const URL = process.env.REACT_APP_DB_URL

/* ************************************************
    persistCurrModuleAndSectionz

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

  const jwt = JSON.parse( localStorage.getItem( 'jwt' ) )

  return fetch( `${URL}/users/${user.user_id}`, {
      method: 'PATCH',
      body: JSON.stringify( body ),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token: ${jwt}`
      },
    } )
    .then( response => {
      if ( !response.ok ) {
        console.log( "---- error" )
        console.log( "-- FETCH ERROR 1" )
        // TODO: re-test this, doesn't the return just go to the next .then?
        dispatch( {
          type: USER_UPDATE_ERROR,
          payload: "error" } )
        return //
      }
      return response.json()
    } )
    .then( message => {
      console.log( "---- success perisisting to db" )
    } )
    .catch( ( error ) => {
      console.log( "---- error" )
      console.log( "-- FETCH ERROR", error )
      dispatch( {
        type: USER_UPDATE_ERROR,
        payload: error } )
      return //
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
      dispatch ( {
        type: USER_UPDATE_CURR_SECTION,
        payload: {
          moduleNum: nextModuleSectionObj.moduleNum,
          sectionNum: nextModuleSectionObj.sectionNum }
      } )
      return //
    }

    // DON'T advance the user's current module and section
    // ---------------------------------------------------
    console.log( "---- no change" )
    dispatch ( {
      type: USER_UPDATE_CURR_SECTION_NO_CHANGE,
      payload: { }
    } )
    return //
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

export const loginUser = ( { email, password}  ) => {

  return async ( dispatch ) => {

    // clear error
    dispatch( { type: LOGIN_USER } ) 

    await firebase.auth().signInWithEmailAndPassword( email, password )
    //user is nested in an object
    //alias as fireBaseUser to avoid overloaded term user
    .then ( async ( { user: fireBaseUser } ) => {
      const jwt = await fireBaseUser.getIdToken()
      console.log("got user from FB", fireBaseUser )
      localStorage.setItem( 'jwt', JSON.stringify( jwt ) )
      await fetch( `${process.env.REACT_APP_DB_URL}/users/`, {
          method:"GET",
          headers: {
            Authorization: `Token: ${jwt}`
          }
        } ).then( async( res ) => {
          const userFromDatabase = await res.json()
          console.log( 'user from MAPmaker database', userFromDatabase )
          loginUserSuccess( dispatch, userFromDatabase )

        } )
      } )
      .catch( function(){
        loginUserFail( dispatch )
      } )
  }
}

const loginUserFail = ( dispatch ) => {
  dispatch( {
    type: LOGIN_USER_FAIL
  } )
}

const loginUserSuccess = async( dispatch, user ) => {

  dispatch( {
    type: LOGIN_USER_SUCCESS,
    payload: user
  } )

}

export const signUp = () => {
  return async ( dispatch ) => {
    console.log( dispatch,'signup' )
    dispatch.signUp()
  }
}

export const signUpUser = ( user ) => {
  let payload = user
  let { email, password } = user

  return async ( dispatch ) => {

      console.log('action signUpUser with ', user)
      //firebase sends back a user but we do not use it here.
      //user and jwt are taken from result of onAuthStateChanged
      await firebase.auth().createUserWithEmailAndPassword( email, password )
        .then(async () => {
          await firebase.auth().onAuthStateChanged( async( fireBaseUser ) => {
            if ( fireBaseUser ) {
              console.log('fireBaseUser', fireBaseUser)
              const jwt = await fireBaseUser.getIdToken()
    
              localStorage.setItem('jwt', JSON.stringify( jwt ))
    
              const body = JSON.stringify( {
                fname:payload.fname,
                lname:payload.lname
              } )
    
                payload.user = await fetch( `${process.env.REACT_APP_DB_URL}/users`, {
                method:'POST',
                headers:{"Content-Type":"application/json",
                Authorization: `Token: ${jwt}`
              },
                body: body
              } )
              .then(
                res => res.json()
              )
              .catch(console.error)
    
              loginUserSuccess( dispatch, payload.user )
    
              dispatch( {
                type: SIGNUP,
                payload
              } )
            }
          } )
        })
        .catch(err => {
          console.error("createUser error", err)
          dispatch( {
            type: SIGNUP_FAIL,
            payload: { errorMessage: err.message }
          })
        })
  }
}

export const userLogout = (  ) => {
  return async ( dispatch ) => {
    firebase.auth().signOut().then(function() {
      dispatch( {
        type: LOGOUT,
      } )
    }).catch(function(error) {
      console.error('logoutUser', error)
    })
  }
}
