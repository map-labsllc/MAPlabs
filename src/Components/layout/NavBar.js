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

  NavBar is hidden if user isn't logged in.
  ************************************************** */

  render() {
    // console.log( "NavBar::render" )

    const { user } = this.props

    // user not logged in, don't show NavBar b/c we're in the login flow.
    // todo: make this work off a a userRD boolean or function, poor form to be testing login_token
    if (!user.login_token) {
      console.log("NavBar hidden, no user.login_token")
      console.log("user: ", user)
      return null
    }

    
    // user logged in, show the navbar
    return (
      <nav className="navbar navbar-expand-lg" color-on-scroll="500">
        <div className="container-fluid">
          <div className="collapse navbar-collapse justify-content-end" id="navigation"> 
            <Nav className="navbar-nav ml-auto pull-right">
              <li className="nav-item">
                <NavLink className="nav-link" to="/account">
                  <i className="nc-icon nc-single-02"></i>
                  <span>Account</span>
                </NavLink>
              </li>
              <li as="Link" className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  <span class="no-icon">Logout</span>
                </NavLink>
              </li>
            </Nav>
          </div>
        </div>
      </nav>
    )
  }
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
