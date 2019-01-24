import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'

import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'

// export default class NavBar extends React.Component {
class NavBar extends React.Component {

  componentDidMount() {
    console.log( "NavBar::componentDidMount()" )
    const { dispatch, user } = this.props

    // asynch calls to load user and static from db
    dispatch( loadAllAnswersAC( user.userId ) )
    dispatch( loadAllTransitionsAC( user.userId ) )
    dispatch( loadAllStaticdataAC() )
  }

  render() {
    console.log( "NavBar::render" )
    return (
      this.props.user &&
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#splash">M.A.P.Labs</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#module1">
            Module 1
          </NavItem>
          <NavItem eventKey={2} href="#module2">
            Module 2
          </NavItem>
          <NavItem eventKey={3} href="#module3">
            Module 3
          </NavItem>
          <NavItem eventKey={4} href="#module4">
            Module 4
          </NavItem>
          <NavItem eventKey={5} href="#module5">
            Module 5
          </NavItem>
          <NavDropdown eventKey={6} title={this.props.user.fname} id="basic-nav-dropdown">
            <MenuItem eventKey={6.1}>Dashboard</MenuItem>
            <MenuItem eventKey={6.2}>Account info</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={6.4}>Log out</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
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
