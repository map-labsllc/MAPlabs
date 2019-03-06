import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'

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
    console.log( "NavBar::componentDidMount()" )

    const { dispatch, user } = this.props

    // we have a mock user, so skip login and add backdoor jwt to localStorage
    // so it get passed in the auth header to backend where the backend
    // will skip auth.
    if (user.user_id) {
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
    console.log( "NavBar::render" )

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
      <Navbar style={styles.body} fixedTop>

        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/">M.A.P.Labs</NavLink>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
        <NavItem style={styles.navItem} componentClass='span' eventKey={0} >
          <NavLink to="/infopage">Info</NavLink>
        </NavItem>
          <NavItem style={styles.navItem} componentClass='span' eventKey={1} >
            <NavLink to="/modules/1">Module 1</NavLink>
          </NavItem>
          <NavItem style={styles.navItem} componentClass='span' eventKey={2} >
            <NavLink to="/modules/2">Module 2</NavLink>
          </NavItem>
          <NavItem style={styles.navItem} componentClass='span' eventKey={3} >
            <NavLink to="/modules/3">Module 3</NavLink>
          </NavItem>
          <NavItem style={styles.navItem} componentClass='span' eventKey={4} >
            <NavLink to="/modules/4">Module 4</NavLink>
          </NavItem>
          <NavItem style={styles.navItem} componentClass='span' eventKey={5} >
            <NavLink to="/modules/5">Module 5</NavLink>
          </NavItem>
          <NavDropdown eventKey={6} title={this.props.user.fname} id="basic-nav-dropdown">
            <MenuItem eventKey={6.1}><NavLink to="/dashboard">Dashboard</NavLink></MenuItem>
            <MenuItem eventKey={6.2}>Account info</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={6.4}>Log out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}

const styles = {
  body: {
    margin: '0em'
  },
  navItem: {
    'padding': '15px',
    'display': 'inline-block',
    'lineHeight': '20px'
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
