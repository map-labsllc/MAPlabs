import React from 'react'
import PropTypes from 'prop-types'

export const MadLibHtml = (madlib) => {
  const {name,
    action,
    belief,
    emotion,
    desire,
    identity,
    result,
    impact,
    change,
    intention } = madlib

  const BLANK = '_____'

  return (
  <p>
    From <span className="madlib">{name || BLANK}</span> I appropriated <span className="madlib">{belief || BLANK}</span>, which makes me feel <span className="madlib">{emotion || BLANK}</span>. 
    <br />
    The effect of this value/belief is that it <span className="madlib">{impact || BLANK}</span> me from <span className="madlib">{desire || BLANK}</span> because I see myself as <span className="madlib">{identity || BLANK}</span> who can/should <span className="madlib">{action || BLANK}</span> so that <span className="madlib">{result || BLANK}</span>. 
    <br />
    Moving forward, I would like to <span className="madlib">{change || BLANK}</span> by <span className="madlib">{intention || BLANK}</span>.
  </p>
  )
}

MadLibHtml.propTypes = {
  madlib: PropTypes.object.isRequired,
}

