import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'
import { MODULES } from '../Modules/ModuleData'
import ModuleLink from '../Modules/ModuleLink'

const SideBar = ({ isLoggedIn }) => {
  const location = useLocation()
  const activeModClass = (modulePath) => (isModuleActive(modulePath) ? 'sidebar-module-heading nav-item active' : 'sidebar-module-heading nav-item collapse')

  const activeSection = (moduleId, sectionId) => {
    const { pathname } = location || '/'
    const link = `/modules/${moduleId}${sectionId ? `/section/${sectionId}` : ''}`

    return pathname === link
  }

  const isModuleActive = (modulePath) => {
    const { pathname } = location || '/'

    return pathname.includes(modulePath)
  }

  return (
    <div className="sidebar has-image" data-color="blue" data-image="/assets/img/sidebar-5.jpg">
      <div className="sidebar-wrapper">
        <div className="logo">
          <a href="/" className="simple-text">
              M.A.P. Labs
          </a>
        </div>

        {isLoggedIn ?
          <ul className="nav ml-auto">
            <li className={activeModClass('/infopage')}>
              <NavLink className="nav-link" to="/infopage">
                <i className="nc-icon nc-explore-2"></i>
                Program Introduction
              </NavLink>
            </li>
            <li className={activeModClass('/modules/list')}>
              <NavLink className="nav-link" to="/modules/list">
                <i className="nc-icon nc-layers-3"></i>
                Module Overview
              </NavLink>
            </li>
            {MODULES.map(mod => {
              const modulePath = `/modules/${mod.id}`
              const collapseId = `module-${mod.id}`

              return (
                <li className={activeModClass(modulePath)} data-toggle="collapse" data-target={`#${collapseId}`}>
                  <NavLink className="nav-link" to={modulePath}>
                    <i className="nc-icon nc-compass-05"></i>
                    <p>Module {mod.id}</p>
                  </NavLink>
                  <Nav className="flex-column collapse sidebar-section" id={collapseId} as="ul">
                    {mod.sections.map(section => {
                      const activeSectionClass = activeSection(mod.id, section.id) ? 'nav-item active' : 'nav-item'

                      return (<li className={activeSectionClass}>
                        <ModuleLink
                          moduleId={mod.id}
                          sectionId={section.id}
                          title={section.title}
                          disabledClass="sidebar-section-title"
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
}

const style = {
  SidebarBackground: { backgroundImage: 'url(/assets/img/sidebar-5.jpg)' }
}

export default SideBar
