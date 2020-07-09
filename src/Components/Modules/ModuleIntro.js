import React from 'react'
import { Link } from 'react-router-dom'

const ModuleIntro = ({ moduleDescription, firstSectionHref }) => (
  <div className="text-center">
    <p className="reading" dangerouslySetInnerHTML={{ __html: moduleDescription }} />
    <Link to={firstSectionHref} className="btn btn-primary">
       Get Started &rarr;
    </Link>
  </div>
)

export default ModuleIntro




