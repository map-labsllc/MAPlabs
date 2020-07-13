import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button } from 'react-bootstrap'
import { PropTypes } from 'prop-types'
import FormCard from '../layout/FormCard'
import { userLogout } from '../../store/user/actions'
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

const Logout = ({ userLogout }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    userLogout().then(() => {
      console.log('redirect /')
      browserHistory.push('/')
    })

  }

  return (
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

export default connect(null, mapDispatchToProps)(Logout)