import React from 'react'
import {
  Button,
  ButtonGroup,
  ListGroupItem,
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
    isCheckedA,
    isCheckedB,
    onAddSelectionCB,
  } = props

  let split = lifeDescriptor.description.split( '#' )
  let firstPartOfSentence = split[0]
  let secondPartOfSentence = split[1]

  let btnStyleA = ( isCheckedA ) ? 'success' : 'default'
  let btnStyleB = ( isCheckedB ) ? 'success' : 'default'


  // render
  return (
    <ListGroupItem >

      {/* ----------------------------- */}
      {/* FIRST PART OF SENTENCE        */}
      {/* ----------------------------- */}
      { firstPartOfSentence }


      {/* ----------------------------- */}
      {/* A / B BUTTONS                 */}
      {/* ----------------------------- */}
      <ButtonGroup>

        <Button
          onClick = { () => { onAddSelectionCB( 'a' ) } }
          bsStyle = { btnStyleA }
        >
          <strong>{ lifeDescriptor.a }</strong>
        </Button>

        <Button
          onClick = { () => { onAddSelectionCB( 'b' ) } }
          bsStyle = { btnStyleB }
        >
          <strong>{ lifeDescriptor.b }</strong>
        </Button>

      </ButtonGroup>


      {/* ----------------------------- */}
      {/* SECOND PART OF SENTENCE       */}
      {/* ----------------------------- */}
      { secondPartOfSentence }

    </ListGroupItem>
  )
}

export default LifeDescriptor
