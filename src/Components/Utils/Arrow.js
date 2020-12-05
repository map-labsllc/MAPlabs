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
    <>
      {direction === 'left' ? <Button onClick={onClickCB}>&larr; Previous</Button> : ''}
      {direction === 'right' ? <Button onClick={onClickCB} className="btn-fill">Next &rarr;</Button> : ''}
    </>
  )
}
export default Arrow
