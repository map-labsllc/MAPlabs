import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Nav,
  NavItem
} from 'react-bootstrap';

import { connect } from 'react-redux'


const SideBar = ( { user }) => (
  <div className="sidebar" data-color="blue" data-image="./assets/img/sidebar-5.jpg">
    <div className="sidebar-wrapper">
      <div className="logo">
        <a href="/" className="simple-text">
          M.A.P. Labs
        </a>
      </div>
    
      {user && user.login_token ? 
      <ul className="nav ml-auto">       
        <li className="nav-item">
          <NavLink className="nav-link" to="/infopage">
            <i class="nc-icon nc-explore-2"></i>
            Introduction
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/list">
            <i class="nc-icon nc-layers-3"></i>
            Module Overview
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/1">
            <i class="nc-icon nc-compass-05"></i>
            <p>Module 1</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/2">
            <i class="nc-icon nc-compass-05"></i>
            Module 2
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/3">
            <i class="nc-icon nc-compass-05"></i>
            Module 3
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/4">
            <i class="nc-icon nc-compass-05"></i>
            Module 4
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/5">
            <i class="nc-icon nc-compass-05"></i>
            Module 5
          </NavLink>
        </li>
      </ul>
      :
      null 
      }
    </div>
  </div>
)


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
)( SideBar )

