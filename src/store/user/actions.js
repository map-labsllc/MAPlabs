import firebase from 'firebase'

import {
  AUTH_CHECK_COMPLETE,
  EMAIL_CHANGED,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  LOGOUT,
  PASSWORD_CHANGED,
  SIGNUP,
  SIGNUP_FAIL,
  USER_ADD_SECTION,
  USER_UPDATE_CURR_SECTION,
  USER_UPDATE_CURR_SECTION_NO_CHANGE,
  USER_UPDATE_ERROR,
  USER_UPDATE_SUCCESS
} from './constants'

import { getNextModuleSection } from './reducer'

const URL = process.env.REACT_APP_DB_URL

/* ************************************************
  checkResponse
*/
const checkResponse = (response) => {
  if(response.ok)
  {
    return response        
  }

  throw new Error(response.statusText);
}

/* ************************************************
    persistCurrModuleAndSection

    Helper to persist the user's new curr_module and curr_section

    user -- user object
    moduleNum -- integer
    sectionNum -- integer
*************************************************** */
export const persistCurrModuleAndSection = (user, moduleNum, sectionNum ) => {
      
  const body = {
    curr_module: moduleNum || 0,
    curr_section: sectionNum || 0,
  }

  return async dispatch => {

    console.log( "---- UPDATING user: ", JSON.stringify( body ) )

    const jwt = JSON.parse( localStorage.getItem( 'jwt' ) )

    return fetch( `${URL}/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify( body ),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token: ${jwt}`
        },
      } )
      .then(checkResponse)
      .then(response => response.json())
      .then(data => {
        dispatch( {
          type: USER_UPDATE_SUCCESS,
          payload: data } )
      })
      .catch( ( error ) => {
        console.log( "---- error" )
        console.log( "-- FETCH ERROR", error )
        dispatch( {
          type: USER_UPDATE_ERROR,
          payload: error } )
      } )
  }
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
  moduleNum = +moduleNum
  sectionNum = +sectionNum
  
  // console.log( `---- userRD::sectionLoadingAC(${moduleNum}, ${sectionNum})` )
  return (dispatch, getState) => {
    dispatch(
      {
        type: USER_ADD_SECTION,
        payload: { moduleNum, sectionNum },
      }
    )
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

  completedModuleNum = +completedModuleNum
  completedSectionNum = +completedSectionNum

  return async ( dispatch, getState ) => {

    // DO update the user's curr_module and curr_section
    // -------------------------------------------------
    if ( ( user.curr_module === completedModuleNum )
      && ( user.curr_section === 0 || user.curr_section === completedSectionNum ) ) {

      const nextModuleSectionObj = getNextModuleSection( getState().userRD, user.curr_module, user.curr_section )
      console.log( "---- nextModuleSectionObj advancing to:", nextModuleSectionObj )

      // persist the new curr_module, curr_section
      dispatch(persistCurrModuleAndSection(user, nextModuleSectionObj.moduleNum, nextModuleSectionObj.sectionNum))

      // update store
      dispatch ( {
        type: USER_UPDATE_CURR_SECTION,
        payload: {
          moduleNum: nextModuleSectionObj.moduleNum,
          sectionNum: nextModuleSectionObj.sectionNum }
      } )
       //
    }

    else {
      // DON'T advance the user's current module and section
      // ---------------------------------------------------
      console.log( "---- no change" )
      dispatch ( {
        type: USER_UPDATE_CURR_SECTION_NO_CHANGE,
        payload: { }
      } )
       //
    }
  }
}


/* ************************************************

*************************************************** */
export const firstNameChanged = ( text ) => ({
    type: FIRSTNAME_CHANGED,
    payload: text
  })

export const lastNameChanged = ( text ) => ({
    type: LASTNAME_CHANGED,
    payload: text
  })

export const emailChanged = ( text ) => ({
    type: EMAIL_CHANGED,
    payload: text
  })

export const passwordChanged = ( text ) => ({
    type: PASSWORD_CHANGED,
    payload: text
  })

export const authCheckComplete = (  ) => ({
    type: AUTH_CHECK_COMPLETE
  })

export const setPersistedUser = ( fireBaseUser ) => async ( dispatch ) => {
    const jwt = await fireBaseUser.getIdToken()

    await fetch( `${URL}/users/`, {
      method:"GET",
      headers: {
        Authorization: `Token: ${jwt}`
      }
    } ).then( async( res ) => {
      const userFromDatabase = await res.json()
      console.log('userFromDatabase', userFromDatabase)
      loginUserSuccess( dispatch, userFromDatabase )
    } )
    .catch( () => {
      loginUserFail( dispatch )
    })
  }

export const forgotPassword = ({ email }) => async ( dispatch ) => {
    dispatch( { type: FORGOT_PASSWORD } ) 

    await firebase.auth().sendPasswordResetEmail(email).then(() => {
      dispatch( { type: FORGOT_PASSWORD_SUCCESS } ) 
    }).catch((error) => {
      dispatch( { 
        type: FORGOT_PASSWORD_FAIL, 
        payload: { errorMessage: error.message } 
      }) 
    })
  }

export const loginUser = ( { email, password}  ) => async ( dispatch ) => {

    // clear error
    dispatch( { type: LOGIN_USER } ) 

    await firebase.auth().signInWithEmailAndPassword( email, password )
    // user is nested in an object
    // alias as fireBaseUser to avoid overloaded term user
    .then ( async ( { user: fireBaseUser } ) => {
      const jwt = await fireBaseUser.getIdToken()

      localStorage.setItem( 'jwt', JSON.stringify( jwt ) )
      await fetch( `${process.env.REACT_APP_DB_URL}/users/`, {
          method:"GET",
          headers: {
            Authorization: `Token: ${jwt}`
          }
          } )
          .then(checkResponse)
          .then(response => response.json())
          .then(data => loginUserSuccess(dispatch, data))
        } )
        .catch( () => {
          loginUserFail( dispatch )
        } )
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



export const signUpUser = ( user ) => {
  const payload = user
  const { email, password } = user

  return async ( dispatch ) => {

    // firebase sends back a user but we do not use it here.
    // user and jwt are taken from result of onAuthStateChanged
    await firebase
      .auth()
      .createUserWithEmailAndPassword( email, password )
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
  
            await fetch(`${process.env.REACT_APP_DB_URL}/users`, 
              {
                  method:'POST',
                  headers:{"Content-Type":"application/json",
                  Authorization: `Token: ${jwt}`
                },
                body
              })
              .then(checkResponse)
              .then(response => response.json())
              .then(user => {
                payload.user = user
                loginUserSuccess( dispatch, payload.user )
    
                dispatch( {
                  type: SIGNUP,
                  payload
                } )
              })
              .catch(err => {
                console.err(err)
                throw new Error(err.message);
              })
        }
      })
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

export const userLogout = (  ) => async ( dispatch ) => {
    firebase.auth().signOut().then(() => {
      localStorage.clear()

      dispatch( {
        type: LOGOUT,
      } )
    }).catch((error) => {
      console.error('logoutUser error', error)
    })
  }

export const getUserJwt = () => async ( dispatch ) => {
    // fresh token
    await firebase.auth().onAuthStateChanged( async( fireBaseUser ) => {
      if ( fireBaseUser ) {
        const jwt = await fireBaseUser.getIdToken()
        localStorage.setItem('jwt', JSON.stringify( jwt ))
      }
      else {
        dispatch( { type: LOGOUT } )
      } 
    })

    // return last token
    return JSON.parse(localStorage.getItem('jwt'))

  }