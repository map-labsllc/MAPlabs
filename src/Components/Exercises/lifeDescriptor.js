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
  let btnStyleA = ''
if( checkedA=== true ){
  btnStyleA= 'success'
}
let btnStyleB = ''
if( checkedB=== true ){
btnStyleB= 'success'
}

  const renderButtons = ( children ) => {
    return (
      <ButtonGroup>
        <Button  onClick= {() => { addingData( first,children.a,second,showCheckedA( children.a ) ) }} bsStyle={btnStyleA} >
          <strong>{children.a}</strong>
        </Button>
        <Button onClick= { () => {addingData( first,children.b,second,showCheckedB( children.b ) ) }} bsStyle={btnStyleB} >
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
