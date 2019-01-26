import React from 'react'
import { ListGroupItem, ButtonGroup, Button } from 'react-bootstrap'

 const lifeDescriptorQuestion = ( { data, addingData,checkedA, checkedB, showCheckedA,showCheckedB } ) => {

   let structured = data.description.split( '#' )
   let first = structured[0]
   let second = structured[1]
  //
  // let  variant = ''
  //  const handleClick = () => {
  //   if(variant === '') variant = 'success'
  //   else{variant = ''}
  // }


  const renderButtons = ( children ) => {
    return (
      <ButtonGroup>
        <Button  onClick= {() => { addingData( first,children.a,second,showCheckedA( children.a ) ) }} bsStyle={checkedA} >
          <strong>{children.a}</strong>
        </Button>
        <Button onClick= { () => {addingData( first,children.b,second,showCheckedB( children.b ) ) }} bsStyle={checkedB} >
          <strong>{children.b}</strong>
        </Button>
      </ButtonGroup>
    )
  }



  return (

    <ListGroupItem >
      { first } { renderButtons( data ) } { second }
    </ListGroupItem>


  )
}

export default lifeDescriptorQuestion
