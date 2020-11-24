import { useEffect } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { bindActionCreators } from 'redux'
import { authCheckComplete, setPersistedUser } from '../../store/user/actions'

const LoadUser = ({ setPersistedUser }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('setPersistedUser fired', user)
        setPersistedUser(user)
        authCheckComplete()
      } else {
        authCheckComplete()
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

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LoadUser)
