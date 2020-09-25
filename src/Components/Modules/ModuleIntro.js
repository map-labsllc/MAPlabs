import React from 'react'
import { Link } from 'react-router-dom'

const ModuleIntro = ({ description, firstSectionHref }) => (
  <div className="text-center">
    <p className="reading" dangerouslySetInnerHTML={{ __html: description }} />
    <div className="text-center">
      <Link to={firstSectionHref} className="btn">
        Get Started &rarr;
      </Link>
    </div>

  </div>
)

export default ModuleIntro