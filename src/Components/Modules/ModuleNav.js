import React from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SectionProgress from '../Framework/SectionProgress'
import { getUser } from '../../store/user/reducer'
import SectionId from '../Utils/SectionId'

const ModuleNav = ({ user, moduleId, sections, title }) => {
  const currentModule = +(user.curr_module)
  const currentSection = +(user.curr_section)
  moduleId = +(moduleId)

  const createLink = (moduleId, sectionId, title) => {
    moduleId = +(moduleId)
    // console.log(currentModule, currentSection, moduleId, sectionId)

    const show =
      // previous module
      moduleId < currentModule ||

      // intro
      (moduleId === currentModule && sectionId === 'intro') ||

      // OR current module and current or previous section
      (moduleId === currentModule && sectionId <= currentSection)

    return show ? <Link to={`/modules/${moduleId}/section/${sectionId}`}>{title}</Link>
      : <>{title}</>
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4>{title}</h4>
      </div>
      <div className="card-body ">
        <div className="table-full-width">
          <table className="table">
            <tbody>
              <tr>
                <td className="text-left align-bottom">
                  <h4></h4>
                </td>
                <td className="text-left align-bottom">
                  <h4>
                    {createLink(moduleId, 'intro', 'Introduction', true)}
                  </h4>
                </td>
                <td className="text-left align-bottom">
                </td>
              </tr>
              {sections.map((section, idx) => {
                return (
                  <tr key={section.id}>
                    <td className="text-left align-middle">
                      <h4><SectionId sectionId={section.id} /></h4>
                    </td>
                    <td className="text-left align-middle">
                      <h4>
                        {createLink(moduleId, section.id, section.title)}
                      </h4>
                    </td>
                    <td className="text-left align-middle">
                      <div style={{ paddingTop: '38px' }}>
                        { SectionProgress(currentModule, currentSection, moduleId, section.id) }
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, passedProps) => {
  const user = getUser(state.userRD)

  return {
    user
  }
}

export default connect(mapStateToProps)(ModuleNav)
