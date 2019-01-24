import firebase from 'firebase'

import {
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  SIGNUP,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS
} from './constants'

export const firstNameChanged = (text) => {
  return {
    type: FIRSTNAME_CHANGED,
    payload: text
  }
}

export const lastNameChanged = (text) => {
  return {
    type: LASTNAME_CHANGED,
    payload: text
  }
}

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    console.log(dispatch)
    dispatch({ type: LOGIN_USER })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('user ball', user);
        loginUserSuccess(dispatch, user)
      })
      .catch(function(){
        loginUserFail(dispatch)
      })
  }
}

export const signUp = () => {
  return async (dispatch) => {
    console.log(dispatch,'signup')
    dispatch.signUp()
  }
}
export const signUpUser = (firstName, lastName, email, password) => {
  let body = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    token: password,
    uri: ''
  }
  return async (dispatch) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('in here duuuuuude')
              body.token = user.uid


            }
          })
          dispatch({type: SIGNUP})
  }
}
//
// export const loadLifeDescriptorsAC = () => {
//   console.log('action!!!');
//   dispatch({
//     type: LOAD_LIFE_DESCRIPTORS
//   })
// }

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
dispatch.main()
}
