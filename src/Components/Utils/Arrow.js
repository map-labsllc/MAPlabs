import React from 'react'
import { Glyphicon, Button } from 'react-bootstrap'

/* **************************************************
   Arrow component

   Display Left or Right arrow button and call CB when clicked 

   props:
     direction - 'left' or 'right'
     glyph - 'arrow-left' or 'arrow-right'
     onClickCB
***************************************************** */
const Arrow = ( props ) => {

  const {
    direction,
    glyph,
    onClickCB,
   } = props

  return (
    <Button
      className={`slide-arrow ${direction}`}
      onClick={onClickCB}>
      <Glyphicon
        glyph={glyph}
      />
    </Button>
  )
}
export default Arrow
