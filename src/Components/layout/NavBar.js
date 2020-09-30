import React from 'react'
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadAllAnswersAC } from '../../store/answers/actions'
import { loadAllStaticdataAC } from '../../store/staticdata/actions'
import { loadListsAC } from '../../store/lists/actions'

// export default class NavBar extends React.Component {
class NavBar extends React.Component {

  // TODO... REFACTOR this doesn't seem like the right place for the data loading to live

  /* ***********************************************
  loadUserData()

  Helper function for kick off loading user data from db.
  The loads are async so consumers of this data need to
  test if it's still loading (uiRD can test loading status)
  ************************************************** */
  loadUserData = (dispatch, user) => {
    // asynch calls to load user data from db
    dispatch( loadAllAnswersAC( user.id ) )
  }

  /* ***********************************************
  componentDidMount()

  This is only needed when we're using the backdoor to start the app with
  an initial user.  We can't wait for componentDidUpdate() b/c it's not called.
  ************************************************** */
  componentDidMount( prevProps, prevState ) {

    const { dispatch, user } = this.props

    // load user data
    if (user && user.login_token) {
      this.loadUserData(dispatch, user)
    }

    // load life descriptors and lists 
    dispatch( loadAllStaticdataAC() )
    dispatch( loadListsAC() )
  }

  /* ***********************************************
  componentDidUpdate()

  Catches changes to the user's login status which will trigger loading
  the new user's data.
  ************************************************** */
  componentDidUpdate( prevProps, prevState ) {
    // console.log( "NavBar::componentDidUpdate()" )
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
              { user && user.login_token ?
              // logged in
              (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/account">
                    <i className="nc-icon nc-single-02 "></i>
                    <span style={style.account}>{`${user.fname} ${user.lname}`}</span>
                  </NavLink>
                </li>
                <li as="Link" className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    <span className="no-icon">Logout</span>
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
                    <span className="no-icon">Login</span>
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
