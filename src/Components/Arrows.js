import React from 'react'

const Arrows = ( { direction, clickFunction, glyph } ) => (
  <div
    className = {`slide-arrow ${direction}`}
    onClick = {clickFunction}>
    {glyph}
  </div>
)
export default Arrows
