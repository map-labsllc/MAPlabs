import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Nav,
  NavItem
} from 'react-bootstrap';

const SideBar = () => (
<div class="sidebar" data-color="blue" data-image="../assets/img/sidebar-5.jpg">
  <div class="sidebar-wrapper">
    <div class="logo">
      <a href="" class="simple-text">
        M.A.P. Labs
      </a>
    </div>
   
    <Nav className="ml-auto">       
      <NavItem>
        <NavLink to="/infopage">Info</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/modules/1">Module 1</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/modules/2">Module 2</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/modules/3">Module 3</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/modules/4">Module 4</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/modules/5">Module 5</NavLink>
      </NavItem>
    </Nav>
  </div>
</div>)

export default SideBar