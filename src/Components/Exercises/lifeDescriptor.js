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
      todo: fill in props
 ***************************************************** */
const LifeDescriptor = ( props ) => {

  const {
    data,
    addSelectionCB,
    checkedA,
    checkedB,
    showCheckedA,
    showCheckedB } = props

  let structured = data.description.split( '#' )
  let first = structured[0]
  let second = structured[1]

  let btnStyleA = 'default'
  if( checkedA=== true ){
    btnStyleA= 'success'
  }

  let btnStyleB = 'default'
  if( checkedB=== true ){
    btnStyleB= 'success'
  }

  const renderButtons = ( children ) => {
    return (
      <ButtonGroup>

        <Button onClick= {() => {
            addSelectionCB( first, children.a, second, showCheckedA( children.a ) ) }} bsStyle={btnStyleA} >
          <strong>{children.a}</strong>
        </Button>

        <Button onClick= { () => {
            addSelectionCB( first, children.b, second, showCheckedB( children.b ) ) }} bsStyle={btnStyleB} >
          <strong>{children.b}</strong>
        </Button>

      </ButtonGroup>
    )
  }

  // render
  return (
    <ListGroupItem >
      { first } { renderButtons( data ) } { second }
    </ListGroupItem>
  )
}

export default LifeDescriptor
