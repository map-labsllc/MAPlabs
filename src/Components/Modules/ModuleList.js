import React from 'react'

import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { MODULES } from './ModuleData'
import { getUser } from '../../store/user/reducer'

const ModuleList = ( { user } ) => {
  const currentModule = +(user.curr_module)
  const currentSection = +(user.curr_section)

  const createLink = (moduleId, title) => {
    const disabled = +(moduleId) > currentModule

    return (
      disabled ? <>{title}</> : 
        <Link to={`/modules/${moduleId}`} >{title}</Link>
    )
  }

  const completion = (moduleId) => {

    // not to this module yet
    if (moduleId > currentModule) { return 0 }

    // determine how many sections completed
    const {sectionCount} = MODULES.filter(m => m.id === +(moduleId))[0]

    // this is a hack, but middle digit of section should correspond to where we are at
    let sectionPosition = `${currentSection}`.split('')[1]
    sectionPosition = +sectionPosition
    const percentComplete = Math.floor(100 * (sectionPosition - 1)/sectionCount)

    console.log('completion:', moduleId, currentSection, sectionPosition, sectionCount, 'completion', percentComplete)
    return percentComplete
  }

  return (
    <div className="reading-wrapper">
    <h1>Module Overview</h1>
 
      <div className="card">
        <div className="card-header">
          <h4>Modules</h4>
        </div>
        <div className="card-body ">
          <div className="table-full-width">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="text-left align-bottom">
                      <h2></h2>
                    </td>
                    <td className="text-left align-bottom">
                      <h4>
                      <Link to={`/infopage`}>Program Introduction</Link> 
                      </h4>
                    </td>
                    <td className="text-left align-bottom">
                      {/* <ProgressBar className="sectionProgress" now={50} label={'50%'}/> */}
                    </td>
                  </tr>
                  { MODULES.map((mod) => (
                    <tr key={mod.id}>
                      <td className="text-left align-bottom">
                        <h4>{mod.id}</h4>
                      </td>
                      <td className="text-left align-bottom">
                        <h4>
                          {createLink(mod.id, mod.title)}
                        </h4>
                      </td>
                      <td className="text-left align-bottom">
                        <ProgressBar className="sectionProgress" now={completion(mod.id)} label={`${completion(mod.id)}%`}/>
                      </td>
                    </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
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

export default connect( mapStateToProps)(ModuleList)

