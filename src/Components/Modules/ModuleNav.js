import React from 'react'

import { connect } from 'react-redux'
import SectionProgress from '../Framework/SectionProgress'
import { getUser } from '../../store/user/reducer'
import SectionId from '../Utils/SectionId'
import ModuleLink from './ModuleLink'

const ModuleNav = ({ user, moduleId, sections, title }) => {
  moduleId = +(moduleId)
  const currentModule = +(user.curr_module)
  const currentSection = +(user.curr_section)

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
                    <ModuleLink
                      moduleId={moduleId}
                      sectionId='intro'
                      title="Introduction"
                    />
                  </h4>
                </td>
                <td className="text-left align-bottom">
                </td>
              </tr>
              {sections.map((section) => (
                <tr key={section.id}>
                  <td className="text-left align-middle">
                    <h4><SectionId sectionId={section.id} /></h4>
                  </td>
                  <td className="text-left align-middle">
                    <h4>
                      <ModuleLink
                        moduleId={moduleId}
                        sectionId={section.id}
                        title={section.title}
                      />
                    </h4>
                  </td>
                  <td className="text-left align-middle">
                    <div style={{ paddingTop: '38px' }}>
                      { SectionProgress(currentModule, currentSection, moduleId, section.id) }
                    </div>
                  </td>
                </tr>
              ))}
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
