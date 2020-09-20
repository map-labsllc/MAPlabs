import React from 'react'

import { Link } from 'react-router-dom'
import SectionProgress from '../Framework/SectionProgress'
import { getUser } from '../../store/user/reducer'
import { persistCurrModuleAndSection } from '../../store/user/actions'
import { connect } from 'react-redux'

const ModuleNav = ( { user, moduleId, sections, title, updateCurrentSection } ) => {
  const currentModule = +(user.curr_module)
  const currentSection = +(user.curr_section)
  moduleId = +(moduleId)

  const createLink = (moduleId, sectionId, title) => {

    moduleId = +(moduleId)
    console.log(currentModule, currentSection, moduleId, sectionId)

    let show = 

      // previous module
      moduleId < currentModule || 

      // intro
      (moduleId === currentModule && sectionId === "intro") ||

      // OR current module and current or previous section 
      (moduleId === currentModule && sectionId <= currentSection)

    return show ? <Link to={`/modules/${moduleId}/section/${sectionId}`} onClick={updateCurrentSection(user, moduleId, sectionId)}>{title}</Link>
      : <b className="sectionNavTitle">{title}</b>
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body ">
        <div className="table-full-width">
            <table className="table">
              <tbody>
                <tr>
                  <td className="text-left">
                    <h2></h2>
                  </td>
                  <td className="text-left">
                    <p>
                      {createLink(moduleId, 'intro', 'Introduction', true)} 
                    </p>
                  </td>
                  <td className="text-left">
                  </td>
                </tr>
                {sections.map((section, idx) =>
                  (
                    <tr key={section.id}>
                      <td className="text-left">
                        <h2>{section.id}</h2>
                      </td>
                      <td className="text-left">
                        <p>
                          {createLink(moduleId, section.id, section.title)}
                        </p>
                      </td>
                      <td className="text-left">
                        { SectionProgress(currentModule, currentSection, moduleId, section.id) }
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}


const mapStateToProps = ( state, passedProps ) => {
  const user = getUser(state.userRD)

  return {
    user
  }
}

const mapDispatchToProps = ( dispatch, passedProps ) => {
  return {
    updateCurrentSection: persistCurrModuleAndSection,
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ModuleNav)
