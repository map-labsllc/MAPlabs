import React from 'react'
import {
  Button,
  ButtonGroup,
 } from 'react-bootstrap'

 /* **************************************************
    LifeDescriptor component

    Displays a single life descriptor with:
      -- The life descriptor
      -- Two buttons with the alternative text to complete the senteence

    props:
      lifeDescriptor - {
           description: 'My life # feel full of meaning',
           a: 'does',
           b: 'does not' }
      isCheckedA - t/f is the a option should be selected
      isCheckedB - t/f is the b option should be selected
      onAddSelectionCB - CB when a selection is made
 ***************************************************** */
const LifeDescriptor = ( props ) => {

  const {
    lifeDescriptor,
    isSelectedA,
    isSelectedB,
    onAddSelectionCB,
  } = props

  let btnStyleA = ( isSelectedA ) ? 'btn-fill' : ''
  let btnStyleB = ( isSelectedB ) ? 'btn-fill' : ''

  // render
  return (

    <>

      {/* ----------------------------- */}
      {/* FIRST PART OF SENTENCE        */}
      {/* ----------------------------- */}
      { lifeDescriptor.firstPart }


      {/* ----------------------------- */}
      {/* A / B BUTTONS                 */}
      {/* ----------------------------- */}
      <ButtonGroup>

        <Button
          onClick = { () => { onAddSelectionCB( 'a' ) } }
          className = { btnStyleA }
        >
          <strong>{ lifeDescriptor.a }</strong>
        </Button>

        <Button
          onClick = { () => { onAddSelectionCB( 'b' ) } }
          className = { btnStyleB }
        >
          <strong>{ lifeDescriptor.b }</strong>
        </Button>

      </ButtonGroup>


      {/* ----------------------------- */}
      {/* SECOND PART OF SENTENCE       */}
      {/* ----------------------------- */}
      { lifeDescriptor.lastPart }

    </>
  )
}

export default LifeDescriptor
