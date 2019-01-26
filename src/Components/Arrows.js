import React from 'react'
import { Glyphicon, Button } from 'react-bootstrap'
const Arrows = ( { direction, clickFunction, glyph } ) => (
  <Button
    className = {`slide-arrow ${direction}`}
    onClick = {clickFunction}>
    <Glyphicon
      glyph={glyph}
    />
  </Button>
)
export default Arrows
