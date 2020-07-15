import React from 'react'

import { Link } from 'react-router-dom'
import { ProgressBar } from 'react-bootstrap'

const ModuleNav = ( { moduleId, sections, title } ) => {
  const createLink = (_moduleId, sectionId, title) => (
    <Link to={`/modules/${_moduleId}/section/${sectionId}`}>{title}</Link>
  )

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
                      {createLink(moduleId, 'intro', 'Introduction')} 
                    </p>
                  </td>
                  <td className="text-left">
                    <ProgressBar className="sectionProgress" now={50} label={'50%'}/>
                  </td>
                </tr>
                {sections.map((section) => (
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


export default ModuleNav
