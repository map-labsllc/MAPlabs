import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'

// export default class NavBar extends React.Component {
class NavBar extends React.Component {

  componentDidUpdate( prevProps, prevState ) {
    console.log( "NavBar::componentDidUpdate()" )
    if ( this.props.user.login_token !== prevProps.user.login_token ) {
      const { dispatch, user } = this.props

      // asynch calls to load user and static from db
      dispatch( loadAllAnswersAC( user.user_id ) )
      dispatch( loadAllTransitionsAC( user.user_id ) )
      dispatch( loadAllStaticdataAC() )
    }
  }

  render() {
    console.log( "NavBar::render" )
    return (
      !this.props.user.login_token ? null : 
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
