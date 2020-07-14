import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button } from 'react-bootstrap'
import { PropTypes } from 'prop-types'
import FormCard from '../layout/FormCard'
import { userLogout } from '../../store/user/actions'
import { createBrowserHistory } from 'history';
import { Redirect } from 'react-router-dom'

export const browserHistory = createBrowserHistory();

const Logout = ({ user, userLogout }) => {
  const [loggedOut, setLoggedout] = useState(!(user && user.login_token));

  const handleLogout = (e) => {
    e.preventDefault();

    userLogout().then(() => {
      console.log('redirect to /')
      setLoggedout(true)
    })

  }

  return (
    loggedOut ?
      <Redirect to="/" /> 
      :
      <FormCard title="Logout">
        <Button className="btn btn-primary" onClick={handleLogout}>Sign Out</Button>
      </FormCard>
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

const mapStateToProps = state => {
  const { user } = state.userRD
  return {
    user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)