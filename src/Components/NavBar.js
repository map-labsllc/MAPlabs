import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export default class NavBar extends React.Component {

  render(){
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
        <NavItem eventKey={2} href="#">
          Module 3
        </NavItem>
        <NavItem eventKey={2} href="#">
          Module 4
        </NavItem>
        <NavItem eventKey={2} href="#">
          Module 5
        </NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Dashboard</MenuItem>
          <MenuItem eventKey={3.2}>Account info</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Log out</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
    )

  }
}

const styles = {
  NavBar
}
