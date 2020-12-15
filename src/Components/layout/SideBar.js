import React from 'react'
import { NavLink } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Nav, NavItem } from 'react-bootstrap'

import { MODULES } from '../Modules/ModuleData'
import ModuleLink from '../Modules/ModuleLink'

const history = createBrowserHistory()
console.log(history.location.pathname)

const isActive = (moduleId, sectionId) => {
  const { pathname } = history.location || '/'
  const link = `/modules/${moduleId}${sectionId ? `/section/${sectionId}` : ''}`

  return pathname === link
}

const isModuleActive = (moduleId,) => {
  const { pathname } = history.location || '/'

  return pathname.includes(`/modules/${moduleId}`)
}

const SideBar = ({ isLoggedIn, user, current_mod, current_sec }) => (
  <div className="sidebar has-image" data-color="blue" data-image="/assets/img/sidebar-5.jpg">
    <div className="sidebar-wrapper">
      <div className="logo">
        <a href="/" className="simple-text">
            M.A.P. Labs
        </a>
      </div>

      {isLoggedIn ?
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
          {MODULES.map(mod => {
            const activeModule = isModuleActive(mod.id)

            return (
              <li className="nav-item">
                <NavLink className={`nav-link ${activeModule ? 'active' : ''}`} to={`/modules/${mod.id}`}>
                  <i className="nc-icon nc-compass-05"></i>
                  <p>Module {mod.id}</p>
                </NavLink>
                <Nav className="flex-column">
                  {mod.sections.map(section => {
                    const active = isActive(mod.id, section.id) ? 'active' : ''

                    return (<li className={active}>
                      <ModuleLink
                        moduleId={mod.id}
                        sectionId={section.id}
                        title={section.title}
                      />
                    </li>)
                  })
                  }
                </Nav>
              </li>
            )
          })
          }
        </ul>
        :
        null
      }
    </div>
    <div className="sidebar-background" style={style.SidebarBackground}></div>
  </div>
)

const style = {
  SidebarBackground: { backgroundImage: 'url(/assets/img/sidebar-5.jpg)' }
}

export default SideBar
