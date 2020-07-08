import React from 'react'

import { Link } from 'react-router-dom'

const ModuleNav = ({moduleId, sections}) => {

  const createLink = (moduleId, sectionId, title) => (
    <Link to={`/modules/${moduleId}/section/${sectionId}`}>{title}</Link>
  )

  return (
    <div className="card">
      <div className="card-header">
        <h3>Exercises</h3>
      </div>
      <ul className="list-group list-group-flush">
        {sections.map(section => (
          <li className="list-group-item">
            {createLink(moduleId, section.id, section.title)}
          </li>
          )
        )}
      </ul>
    </div>
  )
}

export default ModuleNav
