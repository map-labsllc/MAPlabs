import React from 'react'

import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'
import { MODULES } from './ModuleData'

const ModuleList = ( { m} ) => {
  const createLink = (_moduleId, title) => (
    <Link to={`/modules/${_moduleId}`}>{title}</Link>
  )

  return (
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
                    <Link to={`/`}>Introduction</Link> 
                    </p>
                  </td>
                  <td className="text-left">
                    <ProgressBar className="sectionProgress" now={50} label={'50%'}/>
                  </td>
                </tr>
                { MODULES.map((mod) => (
                  <tr>
                    <td className="text-left">
                      <h2>{mod.id}</h2>
                    </td>
                    <td className="text-left">
                      <p>
                        {createLink(mod.id, mod.title)}
                      </p>
                    </td>
                    <td className="text-left">
                      <ProgressBar className="sectionProgress" now={50} label={'50%'}/>
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


export default ModuleList