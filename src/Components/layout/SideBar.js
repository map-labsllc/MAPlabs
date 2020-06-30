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
   
    <Nav className="nav ml-auto">       
      <NavItem className="nav-item">
        <NavLink className="nav-link" to="/infopage">
          <i class="nc-icon nc-explore-2"></i>
          Info
        </NavLink>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink className="nav-link" to="/modules/1">
          <i class="nc-icon nc-compass-05"></i>
          <p>Module 1</p>
        </NavLink>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink className="nav-link" to="/modules/2">
          <i class="nc-icon nc-compass-05"></i>
          Module 2
          </NavLink>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink className="nav-link" to="/modules/3">
          <i class="nc-icon nc-compass-05"></i>
          Module 3
        </NavLink>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink className="nav-link" to="/modules/4">
          <i class="nc-icon nc-compass-05"></i>
          Module 4
        </NavLink>
      </NavItem>
      <NavItem className="nav-item">
        <NavLink className="nav-link" to="/modules/5">
          <i class="nc-icon nc-compass-05"></i>
          Module 5
        </NavLink>
      </NavItem>
    </Nav>
  </div>
</div>)

export default SideBar