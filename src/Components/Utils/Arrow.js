import React from 'react'
import { Button } from 'react-bootstrap'

/* **************************************************
   Arrow component

   Display Left or Right arrow button and call CB when clicked

   props:
     direction - 'left' or 'right'
     onClickCB
***************************************************** */
const Arrow = (props) => {
  const {
    direction,
    onClickCB,
  } = props

  return (
    <Button
      className={`slide-arrow ${direction}`}
      onClick={onClickCB}>
      <i className={`nc-icon nc-stre-${direction}`}></i>
    </Button>
  )
}
export default Arrow
