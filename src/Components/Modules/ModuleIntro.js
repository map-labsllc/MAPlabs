import { concatSeries } from 'async'
import React from 'react'
import { Link } from 'react-router-dom'


const ModuleIntro = ({ user, sectionCompleteCB, moduleNum, description, firstSectionHref, advanceSection }) => {
  advanceSection = (e) => {
    console.log("advancing section")
    if (+user.curr_module === +moduleNum && +user.curr_section === 0)
    {
      console.log("calling sectionCompleteCB", user, moduleNum, 0)
      sectionCompleteCB(user, moduleNum, 0)
    }
  }

  return (
    <div className="text-center">
      <p className="reading" dangerouslySetInnerHTML={{ __html: description }} />
      <div className="text-center">
        <Link to={firstSectionHref} className="btn" onClick={advanceSection}>
          Get Started &rarr;
        </Link>
      </div>

    </div>
  )
  }

export default ModuleIntro