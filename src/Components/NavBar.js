import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'
import { getUser } from '../store/user/reducer'

// export default class NavBar extends React.Component {
class NavBar extends React.Component {

  componentDidMount() {
    console.log( "NavBar::componentDidMount()" )
    const { dispatch, userId } = this.props

    // asynch calls to load user and static from db
    dispatch( loadAllAnswersAC( userId ) )
    dispatch( loadAllTransitionsAC( userId ) )
    dispatch( loadAllStaticdataAC() )
  }

  render() {
    console.log( "NavBar::render" )
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">M.A.P.Labs</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            Module 1
          </NavItem>
          <NavItem eventKey={2} href="#">
            Module 2
          </NavItem>
          <NavItem eventKey={3} href="#">
            Module 3
          </NavItem>
          <NavItem eventKey={4} href="#">
            Module 4
          </NavItem>
          <NavItem eventKey={5} href="#">
            Module 5
          </NavItem>
          <NavDropdown eventKey={6} title="Dropdown" id="basic-nav-dropdown">
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

const styles = {
  NavBar
}
/* ********************************************************
   Wrap NavBar in container to get access to dispatch
*********************************************************** */
const mapStateToProps = state => {
  return {
    userId: getUser( state.userRD ).user_id,
  }
}
const mapDispatchToProps = dispatch => ( {
  dispatch,
} )

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( NavBar )
