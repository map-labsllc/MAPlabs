import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button } from 'reactstrap'
import { PropTypes } from 'prop-types'

import { userLogout } from '../../store/user/actions'


const Logout = ({ userLogout }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    userLogout()
  }

  return (
    <Button onClick={handleLogout}>Sign Out</Button>
  )
}

Logout.propTypes = {
  userLogout: PropTypes.func.isRequired
}


function mapDispatchToProps(dispatch) {
  return {
    userLogout: bindActionCreators(userLogout, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Logout)