import React from 'react'
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadAllAnswersAC } from '../../store/answers/actions'
import { loadAllStaticdataAC } from '../../store/staticdata/actions'

// export default class NavBar extends React.Component {
class NavBar extends React.Component {

  /* ***********************************************
  loadUserData()

  Helper function for kick off loading user data from db.
  The loads are async so consumers of this data need to
  test if it's still loading (uiRD can test loading status)
  ************************************************** */
  loadUserData = (dispatch, user) => {
    // asynch calls to load user data from db
    dispatch( loadAllAnswersAC( user.user_id ) )
  }

  /* ***********************************************
  componentDidMount()

  This is only needed when we're using the backdoor to start the app with
  an initial user.  We can't wait for componentDidUpdate() b/c it's not called.
  ************************************************** */
  componentDidMount( prevProps, prevState ) {
    // console.log( "NavBar::componentDidMount()" )

    const { dispatch, user } = this.props

    // we have a mock user, so skip login and add backdoor jwt to localStorage
    // so it get passed in the auth header to backend where the backend
    // will skip auth.
    if (user && user.user_id) {
      localStorage.setItem( 'jwt', JSON.stringify(process.env.REACT_APP_BACKDOOR_JWT) )
      this.loadUserData(dispatch, user)
    }

    // asynch call to load static from db
    dispatch( loadAllStaticdataAC() )
  }

  /* ***********************************************
  componentDidUpdate()

  Catches changes to the user's login status which will trigger loading
  the new user's data.
  ************************************************** */
  componentDidUpdate( prevProps, prevState ) {
    console.log( "NavBar::componentDidUpdate()" )
    if ( this.props.user.login_token !== prevProps.user.login_token ) {
      const { dispatch, user } = this.props
      this.loadUserData(dispatch, user)
    }
  }

  /* ***********************************************
  render()

  ************************************************** */

  render() {

    const { user } = this.props

    // user logged in, show the navbar
    return (
      <nav className="navbar navbar-expand-lg" color-on-scroll="500">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-end" id="navigation"> 
            <Nav className="navbar-nav ml-auto pull-right">
              { user && user.user_id ?
              // logged in
              (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/account">
                    <i className="nc-icon nc-single-02 "></i>
                    <span style={style.account}>Account</span>
                  </NavLink>
                </li>
                <li as="Link" className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    <span class="no-icon">Logout</span>
                  </NavLink>
                </li>
              </>
              ) :
              // not logged in
              (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    <i className="no-icon"></i>
                    <span>Sign Up</span>
                  </NavLink>
                </li>
                <li as="Link" className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    <span class="no-icon">Login</span>
                  </NavLink>
                </li>
              </>
              )
            }
            </Nav>
          </div>
        </div>
      </nav>
    )
  }
}

const style = {
  account: {marginLeft: '3px'}
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

/* ********************************************************
   Wrap NavBar in container to get access to dispatch
*********************************************************** */

const mapStateToProps = state => {
  const { user } = state.userRD
  return {
    user
  }
}

const mapDispatchToProps = dispatch => ( {
  dispatch,
} )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( NavBar )
