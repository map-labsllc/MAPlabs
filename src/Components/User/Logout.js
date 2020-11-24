import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button } from 'react-bootstrap'
import { PropTypes } from 'prop-types'
import { createBrowserHistory } from 'history';
import FormCard from '../layout/FormCard'
import { userLogout } from '../../store/user/actions'
import { isLoggedIn } from '../../store/user/reducer'

export const browserHistory = createBrowserHistory();

const Logout = ({ isLoggedIn, userLogout }) => {
  const [loggedOut, setLoggedout] = useState(!isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();

    userLogout().then(() => {
      setLoggedout(true)
    })
  }

  useEffect(() => {
    if (!loggedOut) {
      userLogout().then(() => {
        setLoggedout(true)
      })
    }
  });

  return (
    loggedOut ?
      <div className="alert alert-info">
        You have been successfully logged out.
      </div>
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
    user,
    isLoggedIn: isLoggedIn(state.userRD),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
