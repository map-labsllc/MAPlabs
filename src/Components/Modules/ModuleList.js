import React from 'react'

import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import { MODULES } from './ModuleData'
import { getUser } from '../../store/user/reducer'
import { connect } from 'react-redux'

const ModuleList = ( { user } ) => {
  const currentModule = +(user.curr_module)
  const currentSection = +(user.curr_section)

  const createLink = (moduleId, title) => {
    let disabled = +(moduleId) > currentModule

    return (
      disabled ? <b>{title}</b> : 
        <Link to={`/modules/${moduleId}`} >{title}</Link>
    )
  }

  const completion = (moduleId) => {

    // not to this module yet
    if (moduleId > currentModule) { return 0 }

    // determine how many sections completed
    let sectionCount  = MODULES.filter(m => m.id === +(moduleId))[0].sectionCount

    let percent = 100 * Math.floor(currentSection/sectionCount)

    return percent
  }

  return (
    <div className="reading-wrapper">
    <h1>Module Overview</h1>
 
      <div className="card">
        <div className="card-header">
          <h3>Modules</h3>
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
                      <Link to={`/infopage`}>Program Introduction</Link> 
                      </p>
                    </td>
                    <td className="text-left">
                      {/* <ProgressBar className="sectionProgress" now={50} label={'50%'}/> */}
                    </td>
                  </tr>
                  { MODULES.map((mod) => (
                    <tr key={mod.id}>
                      <td className="text-left">
                        <h2>{mod.id}</h2>
                      </td>
                      <td className="text-left">
                        <p>
                          {createLink(mod.id, mod.title)}
                        </p>
                      </td>
                      <td className="text-left">
                        <ProgressBar className="sectionProgress" now={completion(mod.id)} label={`${completion(mod.id)}`}/>
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

