import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { authCheckComplete, setPersistedUser } from '../../store/user/actions'
import { bindActionCreators } from 'redux'

const LoadUser = ({ setPersistedUser }) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("FB auth check", user)
        setPersistedUser(user)
        authCheckComplete()
      } else {
        authCheckComplete()
        console.log("FB auth check", 'NOT PASSED')
      }
    });
  })

  return null
}

LoadUser.propTypes = {
}

function mapDispatchToProps(dispatch) {
  return {
    setPersistedUser: bindActionCreators(setPersistedUser, dispatch),
    authCheckComplete: bindActionCreators(authCheckComplete, dispatch)
  }
}

const mapStateToProps = state => {
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadUser)