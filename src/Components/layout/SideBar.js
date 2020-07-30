import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

const SideBar = ( { user }) => (
  <div className="sidebar has-image" data-color="blue" data-image="/assets/img/sidebar-5.jpg">
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
            <i className="nc-icon nc-explore-2"></i>
            Program Introduction
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/list">
            <i className="nc-icon nc-layers-3"></i>
            Module Overview
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/1">
            <i className="nc-icon nc-compass-05"></i>
            <p>Module 1</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/2">
            <i className="nc-icon nc-compass-05"></i>
            Module 2
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/3">
            <i className="nc-icon nc-compass-05"></i>
            Module 3
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/4">
            <i className="nc-icon nc-compass-05"></i>
            Module 4
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/modules/5">
            <i className="nc-icon nc-compass-05"></i>
            Module 5
          </NavLink>
        </li>
      </ul>
      :
      null 
      }
    </div>
    <div className="sidebar-background" style={style.SidebarBackground}></div>
  </div>
)

const style = {
  SidebarBackground: { backgroundImage: `url(/assets/img/sidebar-5.jpg)` }
}

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

